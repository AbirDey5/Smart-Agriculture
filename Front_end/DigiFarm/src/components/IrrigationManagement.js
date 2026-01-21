import React, { useEffect, useState, useCallback } from 'react';
import {
  fetchIrrigationDashboard,
  fetchIrrigationSchedules,
  createIrrigationSchedule,
  updateIrrigationSchedule,
  deleteIrrigationSchedule,
  waterNow,
  fetchFields
} from '../api';

function IrrigationManagement({ farmerId }) {
  const [dashboard, setDashboard] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingSchedule, setEditingSchedule] = useState(null);
  
  const [newSchedule, setNewSchedule] = useState({
    fieldId: '',
    startTime: '06:00',
    durationMinutes: 30,
    frequency: 'Daily',
    skipIfRain: true
  });

  const loadData = useCallback(async () => {
    if (!farmerId) {
      setError('Farmer ID missing. Please log in.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      const fieldsData = await fetchFields(farmerId);
      setFields(Array.isArray(fieldsData) ? fieldsData : []);

      try {
        const [dashData, schedulesData] = await Promise.all([
          fetchIrrigationDashboard(farmerId),
          fetchIrrigationSchedules(farmerId)
        ]);
        
        setDashboard(dashData || {});
        setSchedules(Array.isArray(schedulesData) ? schedulesData : []);
      } catch (irrigationError) {
        console.warn('Irrigation data unavailable:', irrigationError.message);
        setError('Irrigation system not available. Please ensure the backend is running with irrigation endpoints.');
        setDashboard({});
        setSchedules([]);
      }
    } catch (e) {
      setError(e.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [farmerId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateSchedule = async () => {
    if (!newSchedule.fieldId) {
      alert('Please select a field');
      return;
    }

    try {
      setLoading(true);
      await createIrrigationSchedule(farmerId, newSchedule);
      alert('Schedule created successfully');
      setNewSchedule({
        fieldId: '',
        startTime: '06:00',
        durationMinutes: 30,
        frequency: 'Daily',
        skipIfRain: true
      });
      await loadData();
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (schedule) => {
    try {
      setLoading(true);
      await updateIrrigationSchedule(schedule.scheduleId, {
        active: !schedule.active
      });
      await loadData();
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWaterNow = async (scheduleId, fieldName) => {
    if (!window.confirm(`Start watering ${fieldName} now?`)) return;

    try {
      setLoading(true);
      const result = await waterNow(scheduleId);
      alert(result.message);
      await loadData();
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    if (!window.confirm('Delete this irrigation schedule?')) return;

    try {
      setLoading(true);
      await deleteIrrigationSchedule(scheduleId);
      alert('Schedule deleted successfully');
      await loadData();
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSchedule = (schedule) => {
    setEditingSchedule({
      scheduleId: schedule.scheduleId,
      startTime: schedule.startTime,
      durationMinutes: schedule.duration,
      frequency: schedule.frequency,
      skipIfRain: schedule.skipIfRain
    });
  };

  const handleUpdateSchedule = async () => {
    try {
      setLoading(true);
      await updateIrrigationSchedule(editingSchedule.scheduleId, {
        startTime: editingSchedule.startTime,
        durationMinutes: editingSchedule.durationMinutes,
        frequency: editingSchedule.frequency,
        skipIfRain: editingSchedule.skipIfRain
      });
      alert('Schedule updated successfully');
      setEditingSchedule(null);
      await loadData();
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && schedules.length === 0) {
    return (
      <div className="page-container">
        <h1>💧 Irrigation Management</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">💧 Irrigation Management</h1>
      <p className="page-subtitle">Smart water management for optimal crop growth</p>

      {error && (
        <div className="card" style={{ background: '#fff3e0', color: '#c62828', marginBottom: '1rem' }}>
          <strong>{error}</strong>
        </div>
      )}

      <div className="stats-container">
        <div className="stat-card">
          <h3>{dashboard.waterUsedThisMonth || 0}L</h3>
          <p>Water Used This Month</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #7cb342 0%, #9ccc65 100%)' }}>
          <h3>{dashboard.systemEfficiency || 0}%</h3>
          <p>System Efficiency</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #558b2f 0%, #689f38 100%)' }}>
          <h3>{dashboard.waterSaved || 0}%</h3>
          <p>Water Saved</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #33691e 0%, #558b2f 100%)' }}>
          <h3>{dashboard.activeZones || 0}</h3>
          <p>Active Zones</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Irrigation Schedule</h3>
        {schedules.length === 0 ? (
          <div className="card">
            <p>No irrigation schedules found. Create one below.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Crop</th>
                <th>Last Watered</th>
                <th>Next Schedule</th>
                <th>Duration</th>
                <th>Moisture</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.scheduleId}>
                  <td><strong>{schedule.fieldName}</strong></td>
                  <td>{schedule.crop}</td>
                  <td>{schedule.lastWatered}</td>
                  <td>{schedule.nextScheduled}</td>
                  <td>{schedule.duration} min</td>
                  <td>{schedule.soilMoisture}%</td>
                  <td style={{ color: schedule.active ? '#43a047' : '#757575', fontWeight: '600' }}>
                    {schedule.active ? 'Active' : 'Inactive'}
                  </td>
                  <td>
                    <button 
                      className="btn" 
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem', marginRight: '0.3rem' }}
                      onClick={() => handleEditSchedule(schedule)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn" 
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem', marginRight: '0.3rem' }}
                      onClick={() => handleToggleActive(schedule)}
                      disabled={loading}
                    >
                      {schedule.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      className="btn" 
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem', marginRight: '0.3rem' }}
                      onClick={() => handleWaterNow(schedule.scheduleId, schedule.fieldName)}
                      disabled={loading}
                    >
                      Water Now
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                      onClick={() => handleDeleteSchedule(schedule.scheduleId)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editingSchedule && (
        <div style={{ marginTop: '2rem', background: '#fff3e0', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Edit Schedule</h3>
          <div className="form-group">
            <label>Start Time</label>
            <input 
              type="time" 
              value={editingSchedule.startTime}
              onChange={(e) => setEditingSchedule({...editingSchedule, startTime: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Duration (minutes)</label>
            <input 
              type="number" 
              value={editingSchedule.durationMinutes}
              onChange={(e) => setEditingSchedule({...editingSchedule, durationMinutes: parseInt(e.target.value)})}
            />
          </div>
          <div className="form-group">
            <label>Frequency</label>
            <select 
              value={editingSchedule.frequency}
              onChange={(e) => setEditingSchedule({...editingSchedule, frequency: e.target.value})}
            >
              <option>Daily</option>
              <option>Every 2 days</option>
              <option>Every 3 days</option>
              <option>Weekly</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              <input 
                type="checkbox" 
                style={{ width: 'auto', marginRight: '0.5rem' }}
                checked={editingSchedule.skipIfRain}
                onChange={(e) => setEditingSchedule({...editingSchedule, skipIfRain: e.target.checked})}
              />
              Skip if rain is forecasted
            </label>
          </div>
          <button className="btn" onClick={handleUpdateSchedule} disabled={loading}>
            {loading ? 'Updating...' : 'Update Schedule'}
          </button>
          <button className="btn btn-secondary" onClick={() => setEditingSchedule(null)} disabled={loading}>
            Cancel
          </button>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Create Irrigation Schedule</h3>
        <div style={{ background: '#f1f8e9', padding: '1.5rem', borderRadius: '8px' }}>
          <div className="form-group">
            <label>Select Field</label>
            <select 
              value={newSchedule.fieldId}
              onChange={(e) => setNewSchedule({...newSchedule, fieldId: e.target.value})}
            >
              <option value="">-- Select Field --</option>
              {fields.map(field => (
                <option key={field.fieldId} value={field.fieldId}>
                  {field.fieldName} ({field.crop})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Start Time</label>
            <input 
              type="time" 
              value={newSchedule.startTime}
              onChange={(e) => setNewSchedule({...newSchedule, startTime: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Duration (minutes)</label>
            <input 
              type="number" 
              value={newSchedule.durationMinutes}
              onChange={(e) => setNewSchedule({...newSchedule, durationMinutes: parseInt(e.target.value)})}
            />
          </div>
          <div className="form-group">
            <label>Frequency</label>
            <select 
              value={newSchedule.frequency}
              onChange={(e) => setNewSchedule({...newSchedule, frequency: e.target.value})}
            >
              <option>Daily</option>
              <option>Every 2 days</option>
              <option>Every 3 days</option>
              <option>Weekly</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              <input 
                type="checkbox" 
                style={{ width: 'auto', marginRight: '0.5rem' }}
                checked={newSchedule.skipIfRain}
                onChange={(e) => setNewSchedule({...newSchedule, skipIfRain: e.target.checked})}
              />
              Skip if rain is forecasted
            </label>
          </div>
          <button className="btn" onClick={handleCreateSchedule} disabled={loading}>
            {loading ? 'Creating...' : 'Create Schedule'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default IrrigationManagement;
