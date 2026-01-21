import React from 'react';

function Community() {
  return (
    <div className="page-container">
      <h1 className="page-title">👥 Farmer Community</h1>
      <p className="page-subtitle">Connect, share, and learn from fellow farmers</p>

      <div className="stats-container">
        <div className="stat-card">
          <h3>2,547</h3>
          <p>Community Members</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #7cb342 0%, #9ccc65 100%)' }}>
          <h3>156</h3>
          <p>Active Discussions</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #558b2f 0%, #689f38 100%)' }}>
          <h3>42</h3>
          <p>Expert Advisors</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #33691e 0%, #558b2f 100%)' }}>
          <h3>1,234</h3>
          <p>Tips Shared</p>
        </div>
      </div>

      <div className="card-grid" style={{ marginTop: '2rem' }}>
        <div className="card">
          <h4 style={{ color: '#2e7d32' }}>💬 Recent Discussions</h4>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ padding: '0.8rem', background: '#f1f8e9', borderRadius: '8px', marginBottom: '0.8rem' }}>
              <p style={{ fontWeight: '600', color: '#2e7d32' }}>Best practices for winter wheat?</p>
              <p style={{ fontSize: '0.9rem', color: '#558b2f' }}>Posted by John D. • 24 replies • 2 hours ago</p>
            </div>
            <div style={{ padding: '0.8rem', background: '#f1f8e9', borderRadius: '8px', marginBottom: '0.8rem' }}>
              <p style={{ fontWeight: '600', color: '#2e7d32' }}>Organic pest control methods</p>
              <p style={{ fontSize: '0.9rem', color: '#558b2f' }}>Posted by Sarah M. • 18 replies • 5 hours ago</p>
            </div>
            <div style={{ padding: '0.8rem', background: '#f1f8e9', borderRadius: '8px' }}>
              <p style={{ fontWeight: '600', color: '#2e7d32' }}>Irrigation system recommendations</p>
              <p style={{ fontSize: '0.9rem', color: '#558b2f' }}>Posted by Mike R. • 31 replies • 1 day ago</p>
            </div>
          </div>
          <button className="btn" style={{ marginTop: '1rem' }}>View All Discussions</button>
        </div>

        <div className="card">
          <h4 style={{ color: '#2e7d32' }}>🏆 Top Contributors</h4>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ padding: '0.8rem', background: '#f1f8e9', borderRadius: '8px', marginBottom: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: '600', color: '#2e7d32' }}>Dr. Emily Chen</p>
                <p style={{ fontSize: '0.9rem', color: '#558b2f' }}>Agricultural Expert</p>
              </div>
              <span style={{ fontSize: '1.5rem' }}>🥇</span>
            </div>
            <div style={{ padding: '0.8rem', background: '#f1f8e9', borderRadius: '8px', marginBottom: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: '600', color: '#2e7d32' }}>Robert Johnson</p>
                <p style={{ fontSize: '0.9rem', color: '#558b2f' }}>Veteran Farmer</p>
              </div>
              <span style={{ fontSize: '1.5rem' }}>🥈</span>
            </div>
            <div style={{ padding: '0.8rem', background: '#f1f8e9', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: '600', color: '#2e7d32' }}>Maria Garcia</p>
                <p style={{ fontSize: '0.9rem', color: '#558b2f' }}>Organic Farming Specialist</p>
              </div>
              <span style={{ fontSize: '1.5rem' }}>🥉</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h4 style={{ color: '#2e7d32' }}>📚 Knowledge Base</h4>
          <div style={{ marginTop: '1rem' }}>
            <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '0.5rem' }}>Crop Growing Guides</button>
            <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '0.5rem' }}>Pest Control Library</button>
            <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '0.5rem' }}>Equipment Manuals</button>
            <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '0.5rem' }}>Best Practices</button>
            <button className="btn btn-secondary" style={{ width: '100%' }}>Video Tutorials</button>
          </div>
        </div>

        <div className="card">
          <h4 style={{ color: '#2e7d32' }}>📅 Upcoming Events</h4>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ padding: '0.8rem', background: '#f1f8e9', borderRadius: '8px', marginBottom: '0.8rem' }}>
              <p style={{ fontWeight: '600', color: '#2e7d32' }}>Sustainable Farming Workshop</p>
              <p style={{ fontSize: '0.9rem', color: '#558b2f' }}>Nov 25, 2025 • Online</p>
            </div>
            <div style={{ padding: '0.8rem', background: '#f1f8e9', borderRadius: '8px', marginBottom: '0.8rem' }}>
              <p style={{ fontWeight: '600', color: '#2e7d32' }}>Smart Irrigation Seminar</p>
              <p style={{ fontSize: '0.9rem', color: '#558b2f' }}>Dec 2, 2025 • Local Hall</p>
            </div>
            <div style={{ padding: '0.8rem', background: '#f1f8e9', borderRadius: '8px' }}>
              <p style={{ fontWeight: '600', color: '#2e7d32' }}>Annual Farmers Meet</p>
              <p style={{ fontSize: '0.9rem', color: '#558b2f' }}>Dec 15, 2025 • Convention Center</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Latest Tips & Advice</h3>
        <div className="card-grid">
          <div className="card">
            <h4 style={{ color: '#2e7d32' }}>🌱 Crop Rotation Benefits</h4>
            <p style={{ color: '#558b2f', lineHeight: '1.8' }}>
              Rotating crops helps maintain soil health, reduces pest buildup, and improves yields. 
              Consider a 3-4 year rotation cycle for optimal results.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#757575', marginTop: '1rem' }}>
              Posted by Dr. Emily Chen • 250 likes
            </p>
          </div>

          <div className="card">
            <h4 style={{ color: '#2e7d32' }}>💧 Water Conservation Tips</h4>
            <p style={{ color: '#558b2f', lineHeight: '1.8' }}>
              Drip irrigation can save up to 60% water compared to traditional methods. 
              Schedule watering early morning or late evening to reduce evaporation.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#757575', marginTop: '1rem' }}>
              Posted by Robert Johnson • 198 likes
            </p>
          </div>

          <div className="card">
            <h4 style={{ color: '#2e7d32' }}>🌿 Organic Fertilizers</h4>
            <p style={{ color: '#558b2f', lineHeight: '1.8' }}>
              Compost and green manure are excellent organic fertilizers. They improve soil structure 
              and provide slow-release nutrients for sustainable farming.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#757575', marginTop: '1rem' }}>
              Posted by Maria Garcia • 312 likes
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Ask a Question</h3>
        <div style={{ background: '#f1f8e9', padding: '1.5rem', borderRadius: '8px' }}>
          <div className="form-group">
            <label>Category</label>
            <select>
              <option>General Farming</option>
              <option>Crop Management</option>
              <option>Pest Control</option>
              <option>Irrigation</option>
              <option>Equipment</option>
              <option>Soil Health</option>
              <option>Marketing</option>
            </select>
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" placeholder="Enter your question title" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="4" placeholder="Describe your question in detail..."></textarea>
          </div>
          <button className="btn">Post Question</button>
          <button className="btn btn-secondary">Attach Photo</button>
        </div>
      </div>
    </div>
  );
}

export default Community;
