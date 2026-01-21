import React, { useState, useEffect } from 'react';
import {
  fetchCropsByFarmer,
  fetchCropDashboard,
  createCrop,
  updateCrop,
  deleteCrop,
  fetchFields
} from '../api';

function CropManagement({ farmerId }) {
  const [crops, setCrops] = useState([]);
  const [fields, setFields] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingCrop, setEditingCrop] = useState(null);

  const [newCrop, setNewCrop] = useState({
    cropName: '',
    cropType: '',
    fieldId: '',
    plantedDate: '',
    expectedHarvestDate: '',
    area: '',
    stage: 'Germination',
    health: 'Good',
    expectedYield: '5',
    notes: ''
  });

  useEffect(() => {
    if (!farmerId) return;
    loadData();
  }, [farmerId]);

  const loadData = async () => {
    if (!farmerId) {
      setError('Farmer ID missing. Please log in.');
      console.log('CropManagement: farmerId is empty:', farmerId);
      return;
    }

    console.log('CropManagement: Loading data for farmerId:', farmerId);

    try {
      setError('');
      setLoading(true);

      // Load fields first
      try {
        const fieldsData = await fetchFields(farmerId);
        setFields(Array.isArray(fieldsData) ? fieldsData : []);
      } catch (fieldError) {
        console.error('Failed to load fields:', fieldError);
        setFields([]);
      }

      // Load crops and dashboard
      try {
        const [cropsData, dashboardData] = await Promise.all([
          fetchCropsByFarmer(farmerId),
          fetchCropDashboard(farmerId)
        ]);

        setCrops(Array.isArray(cropsData) ? cropsData : []);
        setDashboard(dashboardData || {});
      } catch (cropError) {
        console.warn('Crop data unavailable:', cropError.message);
        setError('Failed to load crops. ' + cropError.message);
        setCrops([]);
        setDashboard({});
      }
    } catch (e) {
      setError(e.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCrop = async () => {
    if (!newCrop.cropName || !newCrop.cropType || !newCrop.fieldId || !newCrop.plantedDate || !newCrop.expectedHarvestDate || !newCrop.area) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await createCrop(farmerId, {
        ...newCrop,
        fieldId: parseInt(newCrop.fieldId),
        area: parseFloat(newCrop.area),
        expectedYield: parseFloat(newCrop.expectedYield)
      });
      alert('Crop created successfully');
      setNewCrop({
        cropName: '',
        cropType: '',
        fieldId: '',
        plantedDate: '',
        expectedHarvestDate: '',
        area: '',
        stage: 'Germination',
        health: 'Good',
        expectedYield: '5',
        notes: ''
      });
      await loadData();
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCrop = async () => {
    try {
      setLoading(true);
      await updateCrop(editingCrop.cropId, editingCrop);
      alert('Crop updated successfully');
      setEditingCrop(null);
      await loadData();
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCrop = async (cropId) => {
    if (!window.confirm('Delete this crop?')) return;

    try {
      setLoading(true);
      await deleteCrop(cropId);
      alert('Crop deleted successfully');
      await loadData();
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCrop = (crop) => {
    setEditingCrop({ ...crop });
  };

  const getCropIcon = (cropType) => {
    const icons = {
      'Wheat': '🌾',
      'Corn': '🌽',
      'Rice': '🍚',
      'Carrots': '🥕',
      'Tomatoes': '🍅',
      'Soybeans': '🌱',
      'Vegetables': '🥬'
    };
    return icons[cropType] || '🌱';
  };

  const getHealthColor = (health) => {
    const colors = {
      'Excellent': '#2e7d32',
      'Good': '#558b2f',
      'Fair': '#f57c00',
      'Poor': '#c62828'
    };
    return colors[health] || '#757575';
  };

  const getStageColor = (stage) => {
    const colors = {
      'Germination': '#90a4ae',
      'Vegetative Growth': '#558b2f',
      'Flowering': '#ff6f00',
      'Fruiting': '#d32f2f',
      'Root Development': '#6d4c41',
      'Maturity': '#1b5e20'
    };
    return colors[stage] || '#757575';
  };

  if (loading && crops.length === 0) {
    return (
      <div className="page-container">
        <h1>🌱 Crop Management</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">🌱 Crop Management</h1>
      <p className="page-subtitle">Monitor and manage your crops throughout their lifecycle</p>

      {error && (
        <div className="card" style={{ background: '#fff3e0', color: '#c62828', marginBottom: '1rem' }}>
          <strong>{error}</strong>
        </div>
      )}

      {/* Dashboard Stats */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>{dashboard.totalCrops || 0}</h3>
          <p>Total Crops</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #43a047 100%)' }}>
          <h3>{dashboard.excellentHealth || 0}</h3>
          <p>Excellent Health</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #558b2f 0%, #689f38 100%)' }}>
          <h3>{dashboard.goodHealth || 0}</h3>
          <p>Good Health</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f57c00 0%, #ff9800 100%)' }}>
          <h3>{dashboard.daysToNextHarvest || 0} days</h3>
          <p>To Next Harvest</p>
        </div>
      </div>
      {/* Crop Cards Grid */}
      <div className="card-grid" style={{ marginTop: '2rem' }}>
        {crops.length === 0 ? (
          <div className="card" style={{ gridColumn: '1 / -1' }}>
            <p>No crops added yet. Create one below.</p>
          </div>
        ) : (
          crops.map((crop) => (
            <div key={crop.cropId} className="card">
              <div className="card-icon">{getCropIcon(crop.cropType)}</div>
              <h3>{crop.cropName}</h3>
              <p><strong>Crop Type:</strong> {crop.cropType}</p>
              <p><strong>Field:</strong> {crop.fieldName} ({crop.area} acres)</p>
              <p><strong>Stage:</strong> <span style={{ color: getStageColor(crop.stage), fontWeight: '600' }}>{crop.stage}</span></p>
              <p><strong>Health:</strong> <span style={{ color: getHealthColor(crop.health), fontWeight: '600' }}>{crop.health}</span></p>
              <p><strong>Harvest Date:</strong> {crop.expectedHarvestDate}</p>
              <p style={{ color: '#f57c00', fontWeight: '600' }}>{crop.daysToHarvest} days to harvest</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', flex: 1 }}
                  onClick={() => handleEditCrop(crop)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', flex: 1 }}
                  onClick={() => handleDeleteCrop(crop.cropId)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Crop Form */}
      {editingCrop && (
        <div style={{ marginTop: '2rem', background: '#fff3e0', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Edit Crop</h3>
          <div className="form-group">
            <label>Crop Name</label>
            <input 
              type="text" 
              value={editingCrop.cropName}
              onChange={(e) => setEditingCrop({...editingCrop, cropName: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Stage</label>
            <select 
              value={editingCrop.stage}
              onChange={(e) => setEditingCrop({...editingCrop, stage: e.target.value})}
            >
              <option>Germination</option>
              <option>Vegetative Growth</option>
              <option>Flowering</option>
              <option>Fruiting</option>
              <option>Root Development</option>
              <option>Maturity</option>
            </select>
          </div>
          <div className="form-group">
            <label>Health</label>
            <select 
              value={editingCrop.health}
              onChange={(e) => setEditingCrop({...editingCrop, health: e.target.value})}
            >
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>
          </div>
          <div className="form-group">
            <label>Expected Harvest Date</label>
            <input 
              type="date" 
              value={editingCrop.expectedHarvestDate}
              onChange={(e) => setEditingCrop({...editingCrop, expectedHarvestDate: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Expected Yield (tons/acre)</label>
            <input 
              type="number" 
              value={editingCrop.expectedYield}
              onChange={(e) => setEditingCrop({...editingCrop, expectedYield: e.target.value})}
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea 
              value={editingCrop.notes || ''}
              onChange={(e) => setEditingCrop({...editingCrop, notes: e.target.value})}
              rows="3"
            />
          </div>
          <button className="btn" onClick={handleUpdateCrop} disabled={loading}>
            {loading ? 'Updating...' : 'Update Crop'}
          </button>
          <button className="btn btn-secondary" onClick={() => setEditingCrop(null)} disabled={loading} style={{ marginLeft: '0.5rem' }}>
            Cancel
          </button>
        </div>
      )}

      {/* Crop Monitoring Table */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Crop Monitoring Details</h3>
        {crops.length === 0 ? (
          <div className="card">
            <p>No crops to monitor. Create one below.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Field</th>
                <th>Planted Date</th>
                <th>Current Stage</th>
                <th>Days to Harvest</th>
                <th>Expected Yield</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop) => (
                <tr key={crop.cropId}>
                  <td><strong>{crop.cropName}</strong></td>
                  <td>{crop.fieldName}</td>
                  <td>{crop.plantedDate}</td>
                  <td><span style={{ color: getStageColor(crop.stage), fontWeight: '600' }}>{crop.stage}</span></td>
                  <td>{crop.daysToHarvest} days</td>
                  <td>{crop.expectedYield} tons/acre</td>
                  <td><span style={{ color: getHealthColor(crop.health), fontWeight: '600' }}>{crop.health}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add New Crop Form */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Add New Crop</h3>
        {fields.length === 0 ? (
          <div className="card" style={{ background: '#fff3e0', color: '#c62828' }}>
            <strong>⚠️ No fields available.</strong> Please add fields in your profile first.
          </div>
        ) : (
          <div style={{ background: '#f1f8e9', padding: '1.5rem', borderRadius: '8px' }}>
            <div className="form-group">
              <label>Crop Name</label>
              <input 
                type="text" 
                value={newCrop.cropName}
                onChange={(e) => setNewCrop({...newCrop, cropName: e.target.value})}
                placeholder="e.g., Wheat Field A 2025"
              />
            </div>
            <div className="form-group">
              <label>Crop Type</label>
              <select 
                value={newCrop.cropType}
                onChange={(e) => setNewCrop({...newCrop, cropType: e.target.value})}
              >
                <option value="">Select Crop</option>
                <option>Wheat</option>
                <option>Corn</option>
                <option>Rice</option>
                <option>Soybeans</option>
                <option>Carrots</option>
                <option>Tomatoes</option>
                <option>Vegetables</option>
              </select>
            </div>
            <div className="form-group">
              <label>Field</label>
              <select 
                value={newCrop.fieldId}
                onChange={(e) => setNewCrop({...newCrop, fieldId: e.target.value})}
              >
                <option value="">Select Field</option>
                {fields.map(field => (
                  <option key={field.fieldId} value={field.fieldId}>
                    {field.fieldName} ({field.area} acres)
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Planting Date</label>
              <input 
                type="date" 
                value={newCrop.plantedDate}
                onChange={(e) => setNewCrop({...newCrop, plantedDate: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Expected Harvest Date</label>
              <input 
                type="date" 
                value={newCrop.expectedHarvestDate}
                onChange={(e) => setNewCrop({...newCrop, expectedHarvestDate: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Area (acres)</label>
              <input 
                type="number" 
                value={newCrop.area}
                onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
                placeholder="Enter area"
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label>Initial Stage</label>
              <select 
                value={newCrop.stage}
                onChange={(e) => setNewCrop({...newCrop, stage: e.target.value})}
              >
                <option>Germination</option>
                <option>Vegetative Growth</option>
                <option>Flowering</option>
                <option>Fruiting</option>
                <option>Root Development</option>
                <option>Maturity</option>
              </select>
            </div>
            <div className="form-group">
              <label>Expected Yield (tons/acre)</label>
              <input 
                type="number" 
                value={newCrop.expectedYield}
                onChange={(e) => setNewCrop({...newCrop, expectedYield: e.target.value})}
                placeholder="Enter expected yield"
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea 
                value={newCrop.notes}
                onChange={(e) => setNewCrop({...newCrop, notes: e.target.value})}
                placeholder="Optional notes about this crop"
                rows="3"
              />
            </div>
            <button className="btn" onClick={handleCreateCrop} disabled={loading}>
              {loading ? 'Adding...' : 'Add Crop'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropManagement;
