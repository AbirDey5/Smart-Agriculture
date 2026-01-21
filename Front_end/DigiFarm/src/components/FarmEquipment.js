import React from 'react';

function FarmEquipment() {
  return (
    <div className="page-container">
      <h1 className="page-title">🚜 Farm Equipment Management</h1>
      <p className="page-subtitle">Track and maintain your farming equipment inventory</p>

      <div className="stats-container">
        <div className="stat-card">
          <h3>18</h3>
          <p>Total Equipment</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #7cb342 0%, #9ccc65 100%)' }}>
          <h3>15</h3>
          <p>Operational</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #558b2f 0%, #689f38 100%)' }}>
          <h3>2</h3>
          <p>In Maintenance</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #33691e 0%, #558b2f 100%)' }}>
          <h3>1</h3>
          <p>Needs Service</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Equipment Inventory</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Type</th>
              <th>Model</th>
              <th>Purchase Date</th>
              <th>Last Service</th>
              <th>Next Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Tractor #1</strong></td>
              <td>Heavy Machinery</td>
              <td>John Deere 5075E</td>
              <td>Jan 2022</td>
              <td>Oct 15, 2025</td>
              <td>Jan 15, 2026</td>
              <td style={{ color: '#43a047', fontWeight: '600' }}>Operational</td>
            </tr>
            <tr>
              <td><strong>Tractor #2</strong></td>
              <td>Heavy Machinery</td>
              <td>Massey Ferguson 4710</td>
              <td>Mar 2021</td>
              <td>Nov 10, 2025</td>
              <td>In Progress</td>
              <td style={{ color: '#2196f3', fontWeight: '600' }}>In Maintenance</td>
            </tr>
            <tr>
              <td><strong>Combine Harvester</strong></td>
              <td>Harvesting</td>
              <td>Case IH 6130</td>
              <td>Jun 2020</td>
              <td>Sep 5, 2025</td>
              <td>Dec 5, 2025</td>
              <td style={{ color: '#43a047', fontWeight: '600' }}>Operational</td>
            </tr>
            <tr>
              <td><strong>Seed Drill</strong></td>
              <td>Planting</td>
              <td>Kuhn Maxima 3</td>
              <td>Feb 2023</td>
              <td>Aug 20, 2025</td>
              <td>Feb 20, 2026</td>
              <td style={{ color: '#43a047', fontWeight: '600' }}>Operational</td>
            </tr>
            <tr>
              <td><strong>Sprayer</strong></td>
              <td>Treatment</td>
              <td>Hardi Navigator 3000</td>
              <td>May 2022</td>
              <td>Jul 12, 2025</td>
              <td>Overdue</td>
              <td style={{ color: '#f44336', fontWeight: '600' }}>Needs Service</td>
            </tr>
            <tr>
              <td><strong>Cultivator</strong></td>
              <td>Tillage</td>
              <td>Lemken Karat 9</td>
              <td>Apr 2021</td>
              <td>Nov 1, 2025</td>
              <td>In Progress</td>
              <td style={{ color: '#2196f3', fontWeight: '600' }}>In Maintenance</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card-grid" style={{ marginTop: '2rem' }}>
        <div className="card">
          <div className="card-icon">🚜</div>
          <h3>Tractor #1</h3>
          <p><strong>Model:</strong> John Deere 5075E</p>
          <p><strong>Hours Used:</strong> 2,450 hrs</p>
          <p><strong>Fuel Level:</strong> 75%</p>
          <p><strong>Status:</strong> <span style={{ color: '#43a047', fontWeight: '600' }}>Operational</span></p>
          <button className="btn" style={{ marginTop: '1rem' }}>View Details</button>
        </div>

        <div className="card">
          <div className="card-icon">🚜</div>
          <h3>Tractor #2</h3>
          <p><strong>Model:</strong> Massey Ferguson 4710</p>
          <p><strong>Hours Used:</strong> 3,120 hrs</p>
          <p><strong>Fuel Level:</strong> 0%</p>
          <p><strong>Status:</strong> <span style={{ color: '#2196f3', fontWeight: '600' }}>In Service</span></p>
          <button className="btn" style={{ marginTop: '1rem' }}>View Details</button>
        </div>

        <div className="card">
          <div className="card-icon">🌾</div>
          <h3>Combine Harvester</h3>
          <p><strong>Model:</strong> Case IH 6130</p>
          <p><strong>Hours Used:</strong> 1,890 hrs</p>
          <p><strong>Fuel Level:</strong> 90%</p>
          <p><strong>Status:</strong> <span style={{ color: '#43a047', fontWeight: '600' }}>Operational</span></p>
          <button className="btn" style={{ marginTop: '1rem' }}>View Details</button>
        </div>

        <div className="card" style={{ border: '2px solid #f44336', background: '#ffebee' }}>
          <div className="card-icon">💨</div>
          <h3>Sprayer</h3>
          <p><strong>Model:</strong> Hardi Navigator 3000</p>
          <p><strong>Hours Used:</strong> 980 hrs</p>
          <p><strong>Fuel Level:</strong> 45%</p>
          <p><strong>Status:</strong> <span style={{ color: '#f44336', fontWeight: '600' }}>Service Overdue!</span></p>
          <button className="btn" style={{ marginTop: '1rem', background: 'linear-gradient(135deg, #f44336 0%, #e53935 100%)' }}>Schedule Service</button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Maintenance Schedule</h3>
        <div className="card">
          <table style={{ width: '100%' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '1rem', fontWeight: '600' }}>Nov 20, 2025</td>
                <td style={{ padding: '1rem' }}>Tractor #1 - Oil Change</td>
                <td style={{ padding: '1rem' }}><button className="btn btn-secondary" style={{ padding: '0.3rem 1rem' }}>Reschedule</button></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '1rem', fontWeight: '600' }}>Nov 25, 2025</td>
                <td style={{ padding: '1rem' }}>Cultivator - Blade Sharpening</td>
                <td style={{ padding: '1rem' }}><button className="btn btn-secondary" style={{ padding: '0.3rem 1rem' }}>Reschedule</button></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '1rem', fontWeight: '600' }}>Dec 1, 2025</td>
                <td style={{ padding: '1rem' }}>Sprayer - Full Service (Overdue)</td>
                <td style={{ padding: '1rem' }}><button className="btn" style={{ padding: '0.3rem 1rem', background: 'linear-gradient(135deg, #f44336 0%, #e53935 100%)' }}>Urgent</button></td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', fontWeight: '600' }}>Dec 5, 2025</td>
                <td style={{ padding: '1rem' }}>Combine Harvester - Pre-Season Check</td>
                <td style={{ padding: '1rem' }}><button className="btn btn-secondary" style={{ padding: '0.3rem 1rem' }}>Reschedule</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Add New Equipment</h3>
        <div style={{ background: '#f1f8e9', padding: '1.5rem', borderRadius: '8px' }}>
          <div className="form-group">
            <label>Equipment Name</label>
            <input type="text" placeholder="e.g., Tractor #3" />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select>
              <option>Select Type</option>
              <option>Heavy Machinery</option>
              <option>Planting Equipment</option>
              <option>Harvesting Equipment</option>
              <option>Treatment Equipment</option>
              <option>Tillage Equipment</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Model</label>
            <input type="text" placeholder="Equipment model" />
          </div>
          <div className="form-group">
            <label>Purchase Date</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Service Interval (days)</label>
            <input type="number" placeholder="e.g., 90" defaultValue="90" />
          </div>
          <button className="btn">Add Equipment</button>
        </div>
      </div>
    </div>
  );
}

export default FarmEquipment;
