// import React from 'react';

// function Dashboard() {
//   return (
//     <div className="page-container">
//       <h1 className="page-title">📊 Farm Dashboard</h1>
//       <p className="page-subtitle">Overview of your farm's performance and metrics</p>

//       <div className="stats-container">
//         <div className="stat-card">
//           <h3>45</h3>
//           <p>Total Acres</p>
//         </div>
//         <div className="stat-card" style={{ background: 'linear-gradient(135deg, #7cb342 0%, #9ccc65 100%)' }}>
//           <h3>12</h3>
//           <p>Active Crops</p>
//         </div>
//         <div className="stat-card" style={{ background: 'linear-gradient(135deg, #558b2f 0%, #689f38 100%)' }}>
//           <h3>85%</h3>
//           <p>Soil Health</p>
//         </div>
//         <div className="stat-card" style={{ background: 'linear-gradient(135deg, #33691e 0%, #558b2f 100%)' }}>
//           <h3>95%</h3>
//           <p>Irrigation Efficiency</p>
//         </div>
//       </div>

//       <div className="card-grid" style={{ marginTop: '2rem' }}>
//         <div className="card">
//           <h3>🌾 Current Season Overview</h3>
//           <table style={{ width: '100%', marginTop: '1rem' }}>
//             <tbody>
//               <tr>
//                 <td style={{ padding: '0.5rem 0', fontWeight: '600' }}>Season:</td>
//                 <td>Winter 2025</td>
//               </tr>
//               <tr>
//                 <td style={{ padding: '0.5rem 0', fontWeight: '600' }}>Days Remaining:</td>
//                 <td>45 days</td>
//               </tr>
//               <tr>
//                 <td style={{ padding: '0.5rem 0', fontWeight: '600' }}>Expected Harvest:</td>
//                 <td>January 2026</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="card">
//           <h3>💧 Water Usage</h3>
//           <div style={{ marginTop: '1rem' }}>
//             <p><strong>Today:</strong> 1,250 Liters</p>
//             <p><strong>This Week:</strong> 8,750 Liters</p>
//             <p><strong>This Month:</strong> 32,500 Liters</p>
//             <p style={{ color: '#43a047', fontWeight: '600', marginTop: '1rem' }}>
//               ↓ 15% reduction from last month
//             </p>
//           </div>
//         </div>

//         <div className="card">
//           <h3>🌡️ Weather Status</h3>
//           <div style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
//             <p><strong>Current:</strong> 24°C, Sunny</p>
//             <p><strong>Tomorrow:</strong> 22°C, Cloudy</p>
//             <p><strong>Humidity:</strong> 65%</p>
//             <p><strong>Wind:</strong> 12 km/h</p>
//           </div>
//         </div>

//         <div className="card">
//           <h3>⚠️ Alerts & Notifications</h3>
//           <div style={{ marginTop: '1rem' }}>
//             <div style={{ padding: '0.5rem', background: '#fff3e0', borderRadius: '4px', marginBottom: '0.5rem' }}>
//               <p style={{ color: '#f57c00' }}>⚠️ Schedule irrigation for Field A</p>
//             </div>
//             <div style={{ padding: '0.5rem', background: '#e8f5e9', borderRadius: '4px', marginBottom: '0.5rem' }}>
//               <p style={{ color: '#2e7d32' }}>✓ Fertilizer applied to Field B</p>
//             </div>
//             <div style={{ padding: '0.5rem', background: '#fff3e0', borderRadius: '4px' }}>
//               <p style={{ color: '#f57c00' }}>⚠️ Equipment maintenance due in 3 days</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div style={{ marginTop: '2rem' }}>
//         <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Recent Activities</h3>
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Activity</th>
//               <th>Field</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Nov 15, 2025</td>
//               <td>Irrigation</td>
//               <td>Field A</td>
//               <td style={{ color: '#43a047', fontWeight: '600' }}>Completed</td>
//             </tr>
//             <tr>
//               <td>Nov 14, 2025</td>
//               <td>Pest Control</td>
//               <td>Field C</td>
//               <td style={{ color: '#43a047', fontWeight: '600' }}>Completed</td>
//             </tr>
//             <tr>
//               <td>Nov 13, 2025</td>
//               <td>Fertilization</td>
//               <td>Field B</td>
//               <td style={{ color: '#43a047', fontWeight: '600' }}>Completed</td>
//             </tr>
//             <tr>
//               <td>Nov 12, 2025</td>
//               <td>Soil Testing</td>
//               <td>Field D</td>
//               <td style={{ color: '#43a047', fontWeight: '600' }}>Completed</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import { useEffect, useState } from 'react';
import {
  fetchDashboard,
  fetchFields,
  fetchWeather,
  fetchMarketInsight
} from '../api';
import StatCard from './StatCard';

export default function Dashboard({ farmerId }) {
  const [dashboard, setDashboard] = useState({});
  const [fields, setFields] = useState([]);
  const [weather, setWeather] = useState(null);
  const [insight, setInsight] = useState(null);
  const [error, setError] = useState('');

  const city = 'Dhaka';

  useEffect(() => {
    async function load() {
      if (!farmerId) {
        setError('Farmer ID missing. Please log in to view your dashboard.');
        return;
      }

      try {
        setError('');
        const dash = await fetchDashboard(farmerId);
        const fieldData = await fetchFields(farmerId);
        const weatherData = await fetchWeather(city);

        setDashboard(dash || {});
        setFields(Array.isArray(fieldData) ? fieldData : []);
        setWeather(weatherData || null);

        if (Array.isArray(fieldData) && fieldData.length > 0) {
          try {
            const aiInsight = await fetchMarketInsight(
              fieldData[0].crop,
              city
            );
            setInsight(aiInsight || null);
          } catch (aiError) {
            console.warn('AI market insight unavailable:', aiError.message);
            setInsight(null);
          }
        } else {
          setInsight(null);
        }
      } catch (e) {
        setError(e.message || 'Failed to load dashboard data.');
      }
    }
    load();
  }, [farmerId]);

  return (
    <div className="page-container">
      <h1>Farm Dashboard</h1>

      {error ? (
        <div className="card" style={{ background: '#fff3e0', color: '#c62828' }}>
          <strong>{error}</strong>
        </div>
      ) : null}

      <div className="stats-container">
        <StatCard value={dashboard.totalFields || 0} label="Fields" />
        <StatCard value={dashboard.activeCrops || 0} label="Active Crops" />
        <StatCard value={dashboard.totalTasks || 0} label="Total Tasks" />
      </div>

      {/* WEATHER */}
      {weather && (
        <div className="card">
          <h3>Weather</h3>
          <p>{Math.round(weather.temperature)}°C</p>
          <p>{weather.condition}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>{weather.rainForecast}</p>
        </div>
      )}

      {/* FIELDS */}
      <div className="card">
        <h3>Your Fields</h3>
        {fields.map((f) => (
          <p key={f.fieldId}>
            🌾 {f.fieldName} – {f.crop} ({f.area} acres)
          </p>
        ))}
      </div>

      {/* AI MARKET INSIGHT */}
      {insight && (
        <div className="card">
          <h3>AI Market Insight</h3>
          <p><strong>Price:</strong> {insight.estimatedPrice}</p>
          <p><strong>Trend:</strong> {insight.trend}</p>
          <p>{insight.explanation}</p>
        </div>
      )}
    </div>
  );
}
