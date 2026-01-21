import React from 'react';

function PestControl() {
  return (
    <div className="page-container">
      <h1 className="page-title">🐛 Pest & Disease Control</h1>
      <p className="page-subtitle">Monitor, identify, and manage pests and diseases effectively</p>

      <div className="stats-container">
        <div className="stat-card">
          <h3>3</h3>
          <p>Active Threats</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #7cb342 0%, #9ccc65 100%)' }}>
          <h3>12</h3>
          <p>Treatments Applied</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #558b2f 0%, #689f38 100%)' }}>
          <h3>92%</h3>
          <p>Success Rate</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #33691e 0%, #558b2f 100%)' }}>
          <h3>Low</h3>
          <p>Overall Risk</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Current Pest & Disease Status</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Pest/Disease</th>
              <th>Severity</th>
              <th>Detected On</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Field A</strong></td>
              <td>Aphids</td>
              <td style={{ color: '#ff9800', fontWeight: '600' }}>Medium</td>
              <td>Nov 12, 2025</td>
              <td style={{ color: '#2196f3', fontWeight: '600' }}>Under Treatment</td>
              <td><button className="btn" style={{ padding: '0.3rem 0.8rem', fontSize: '0.9rem' }}>View</button></td>
            </tr>
            <tr>
              <td><strong>Field B</strong></td>
              <td>Corn Borer</td>
              <td style={{ color: '#f44336', fontWeight: '600' }}>High</td>
              <td>Nov 10, 2025</td>
              <td style={{ color: '#2196f3', fontWeight: '600' }}>Under Treatment</td>
              <td><button className="btn" style={{ padding: '0.3rem 0.8rem', fontSize: '0.9rem' }}>View</button></td>
            </tr>
            <tr>
              <td><strong>Field C</strong></td>
              <td>Leaf Spot</td>
              <td style={{ color: '#4caf50', fontWeight: '600' }}>Low</td>
              <td>Nov 14, 2025</td>
              <td style={{ color: '#ff9800', fontWeight: '600' }}>Monitoring</td>
              <td><button className="btn" style={{ padding: '0.3rem 0.8rem', fontSize: '0.9rem' }}>View</button></td>
            </tr>
            <tr>
              <td><strong>Field D</strong></td>
              <td>No threats</td>
              <td style={{ color: '#43a047', fontWeight: '600' }}>None</td>
              <td>-</td>
              <td style={{ color: '#43a047', fontWeight: '600' }}>Healthy</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card-grid" style={{ marginTop: '2rem' }}>
        <div className="card" style={{ border: '2px solid #ff9800', background: '#fff3e0' }}>
          <h3 style={{ color: '#f57c00' }}>⚠️ Field A - Aphids</h3>
          <p><strong>Severity:</strong> Medium</p>
          <p><strong>Affected Area:</strong> 2 acres</p>
          <p><strong>Treatment:</strong> Neem oil spray</p>
          <p><strong>Applied:</strong> Nov 13, 2025</p>
          <p><strong>Next Application:</strong> Nov 20, 2025</p>
          <div style={{ marginTop: '1rem' }}>
            <button className="btn">Update Status</button>
          </div>
        </div>

        <div className="card" style={{ border: '2px solid #f44336', background: '#ffebee' }}>
          <h3 style={{ color: '#c62828' }}>🚨 Field B - Corn Borer</h3>
          <p><strong>Severity:</strong> High</p>
          <p><strong>Affected Area:</strong> 3.5 acres</p>
          <p><strong>Treatment:</strong> Bt spray + manual removal</p>
          <p><strong>Applied:</strong> Nov 11, 2025</p>
          <p><strong>Next Inspection:</strong> Nov 18, 2025</p>
          <div style={{ marginTop: '1rem' }}>
            <button className="btn">Update Status</button>
          </div>
        </div>

        <div className="card" style={{ border: '2px solid #4caf50', background: '#e8f5e9' }}>
          <h3 style={{ color: '#2e7d32' }}>👁️ Field C - Leaf Spot</h3>
          <p><strong>Severity:</strong> Low</p>
          <p><strong>Affected Area:</strong> 0.5 acres</p>
          <p><strong>Treatment:</strong> Monitoring only</p>
          <p><strong>Last Checked:</strong> Nov 16, 2025</p>
          <p><strong>Next Inspection:</strong> Nov 19, 2025</p>
          <div style={{ marginTop: '1rem' }}>
            <button className="btn btn-secondary">Update Status</button>
          </div>
        </div>

        <div className="card">
          <h3 style={{ color: '#2e7d32' }}>✓ Field D - Healthy</h3>
          <p><strong>Status:</strong> No threats detected</p>
          <p><strong>Last Inspection:</strong> Nov 15, 2025</p>
          <p><strong>Next Inspection:</strong> Nov 22, 2025</p>
          <p><strong>Preventive Measures:</strong> Active</p>
          <p style={{ color: '#43a047', fontWeight: '600', marginTop: '1rem' }}>
            Continue monitoring schedule
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Common Pests & Diseases Library</h3>
        <div className="card-grid">
          <div className="card">
            <h4 style={{ color: '#2e7d32' }}>🐛 Aphids</h4>
            <p><strong>Affected Crops:</strong> Most vegetables, wheat</p>
            <p><strong>Symptoms:</strong> Yellowing leaves, sticky residue</p>
            <p><strong>Treatment:</strong> Neem oil, insecticidal soap</p>
            <button className="btn btn-secondary" style={{ marginTop: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Learn More</button>
          </div>

          <div className="card">
            <h4 style={{ color: '#2e7d32' }}>🦗 Locusts</h4>
            <p><strong>Affected Crops:</strong> Grains, vegetables</p>
            <p><strong>Symptoms:</strong> Rapid crop damage, visible insects</p>
            <p><strong>Treatment:</strong> Pyrethroid sprays, barriers</p>
            <button className="btn btn-secondary" style={{ marginTop: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Learn More</button>
          </div>

          <div className="card">
            <h4 style={{ color: '#2e7d32' }}>🍄 Powdery Mildew</h4>
            <p><strong>Affected Crops:</strong> Vegetables, fruits</p>
            <p><strong>Symptoms:</strong> White powder on leaves</p>
            <p><strong>Treatment:</strong> Sulfur fungicide, spacing</p>
            <button className="btn btn-secondary" style={{ marginTop: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Learn More</button>
          </div>

          <div className="card">
            <h4 style={{ color: '#2e7d32' }}>🐛 Caterpillars</h4>
            <p><strong>Affected Crops:</strong> Cabbage, tomatoes</p>
            <p><strong>Symptoms:</strong> Holes in leaves, visible larvae</p>
            <p><strong>Treatment:</strong> Bt spray, manual removal</p>
            <button className="btn btn-secondary" style={{ marginTop: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Learn More</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Report New Pest/Disease</h3>
        <div style={{ background: '#f1f8e9', padding: '1.5rem', borderRadius: '8px' }}>
          <div className="form-group">
            <label>Select Field</label>
            <select>
              <option>Field A</option>
              <option>Field B</option>
              <option>Field C</option>
              <option>Field D</option>
            </select>
          </div>
          <div className="form-group">
            <label>Pest/Disease Type</label>
            <select>
              <option>Select type</option>
              <option>Aphids</option>
              <option>Locusts</option>
              <option>Caterpillars</option>
              <option>Powdery Mildew</option>
              <option>Rust</option>
              <option>Blight</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Severity</label>
            <select>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="4" placeholder="Describe the symptoms and affected area..."></textarea>
          </div>
          <button className="btn">Submit Report</button>
          <button className="btn btn-secondary">Upload Photo</button>
        </div>
      </div>
    </div>
  );
}

export default PestControl;
