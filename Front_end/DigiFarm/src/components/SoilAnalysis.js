import React from 'react';

function SoilAnalysis() {
  return (
    <div className="page-container">
      <h1 className="page-title">🌍 Soil Analysis</h1>
      <p className="page-subtitle">Monitor soil health and get recommendations for optimal crop growth</p>

      <div className="stats-container">
        <div className="stat-card">
          <h3>85%</h3>
          <p>Overall Soil Health</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #7cb342 0%, #9ccc65 100%)' }}>
          <h3>6.8</h3>
          <p>Average pH Level</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #558b2f 0%, #689f38 100%)' }}>
          <h3>High</h3>
          <p>Nutrient Levels</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #33691e 0%, #558b2f 100%)' }}>
          <h3>78%</h3>
          <p>Moisture Content</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Field-wise Soil Analysis</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>pH Level</th>
              <th>Nitrogen (N)</th>
              <th>Phosphorus (P)</th>
              <th>Potassium (K)</th>
              <th>Organic Matter</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Field A</strong></td>
              <td>6.5</td>
              <td>High</td>
              <td>Medium</td>
              <td>High</td>
              <td>4.2%</td>
              <td style={{ color: '#43a047', fontWeight: '600' }}>Excellent</td>
            </tr>
            <tr>
              <td><strong>Field B</strong></td>
              <td>6.8</td>
              <td>Medium</td>
              <td>High</td>
              <td>Medium</td>
              <td>3.8%</td>
              <td style={{ color: '#43a047', fontWeight: '600' }}>Good</td>
            </tr>
            <tr>
              <td><strong>Field C</strong></td>
              <td>7.2</td>
              <td>High</td>
              <td>High</td>
              <td>High</td>
              <td>5.1%</td>
              <td style={{ color: '#43a047', fontWeight: '600' }}>Excellent</td>
            </tr>
            <tr>
              <td><strong>Field D</strong></td>
              <td>6.3</td>
              <td>Low</td>
              <td>Medium</td>
              <td>Medium</td>
              <td>3.2%</td>
              <td style={{ color: '#ff9800', fontWeight: '600' }}>Needs Attention</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card-grid" style={{ marginTop: '2rem' }}>
        <div className="card">
          <h3>🌡️ Soil Temperature</h3>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>Field A:</strong> 22°C (Optimal)</p>
            <p><strong>Field B:</strong> 21°C (Optimal)</p>
            <p><strong>Field C:</strong> 23°C (Optimal)</p>
            <p><strong>Field D:</strong> 20°C (Good)</p>
          </div>
        </div>

        <div className="card">
          <h3>💧 Soil Moisture</h3>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>Field A:</strong> 75% (Good)</p>
            <p><strong>Field B:</strong> 82% (Optimal)</p>
            <p><strong>Field C:</strong> 78% (Good)</p>
            <p><strong>Field D:</strong> 65% (Low - Needs Irrigation)</p>
          </div>
        </div>

        <div className="card">
          <h3>🪨 Soil Texture</h3>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>Field A:</strong> Loamy Clay</p>
            <p><strong>Field B:</strong> Sandy Loam</p>
            <p><strong>Field C:</strong> Clay Loam</p>
            <p><strong>Field D:</strong> Sandy Clay</p>
          </div>
        </div>

        <div className="card">
          <h3>⚡ Electrical Conductivity</h3>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>Field A:</strong> 0.8 dS/m (Normal)</p>
            <p><strong>Field B:</strong> 0.6 dS/m (Normal)</p>
            <p><strong>Field C:</strong> 0.9 dS/m (Normal)</p>
            <p><strong>Field D:</strong> 1.2 dS/m (Slightly High)</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Recommendations</h3>
        <div className="card">
          <h4 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Field A - Wheat</h4>
          <ul style={{ lineHeight: '2', color: '#558b2f' }}>
            <li>✓ Soil health is excellent for wheat cultivation</li>
            <li>✓ Consider adding phosphorus-based fertilizer to boost levels</li>
            <li>✓ Maintain current irrigation schedule</li>
            <li>✓ pH level is optimal for wheat (6.0-7.0)</li>
          </ul>
        </div>

        <div className="card" style={{ marginTop: '1rem' }}>
          <h4 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Field D - Requires Attention</h4>
          <ul style={{ lineHeight: '2', color: '#558b2f' }}>
            <li>⚠️ Low nitrogen levels - apply nitrogen-rich fertilizer</li>
            <li>⚠️ Low moisture content - increase irrigation frequency</li>
            <li>⚠️ Slightly high salinity - monitor and consider leaching</li>
            <li>✓ Consider planting nitrogen-fixing cover crops</li>
            <li>✓ Schedule soil re-testing in 2 weeks</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Request New Soil Test</h3>
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
            <label>Test Type</label>
            <select>
              <option>Complete Analysis</option>
              <option>NPK Only</option>
              <option>pH and Moisture</option>
              <option>Micronutrients</option>
            </select>
          </div>
          <div className="form-group">
            <label>Preferred Date</label>
            <input type="date" />
          </div>
          <button className="btn">Schedule Test</button>
        </div>
      </div>
    </div>
  );
}

export default SoilAnalysis;
