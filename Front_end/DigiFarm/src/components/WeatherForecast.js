import React, { useState } from 'react';
import { fetchOpenWeather } from '../api';

function WeatherForecast() {
  const [city, setCity] = useState('Chittagong');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState(null);

  const loadWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchOpenWeather(city);
      setWeather(data);
    } catch (e) {
      setWeather(null);
      setError(e.message || 'Failed to load weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">🌤️ Weather Forecast</h1>
      <p className="page-subtitle">Real-time weather updates for your farm</p>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Check Weather</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #c8e6c9', minWidth: '240px' }}
          />
          <button className="btn" onClick={loadWeather} disabled={loading || !city.trim()}>
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>
        {error ? (
          <p style={{ marginTop: '1rem', color: '#c62828' }}>{error}</p>
        ) : null}
      </div>

      {weather ? (
        <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%)', color: 'white' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Current Weather</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontSize: '4rem' }}>🌤️</div>
            <div>
              <h3 style={{ fontSize: '3rem', margin: '0' }}>{Math.round(weather.temperature)}°C</h3>
              <p style={{ fontSize: '1.2rem', margin: '0' }}>{weather.condition || 'N/A'}</p>
              <p style={{ fontSize: '1rem', margin: '0.25rem 0 0' }}><strong>City:</strong> {city}</p>
            </div>
            <div style={{ textAlign: 'left' }}>
              <p><strong>Humidity:</strong> {weather.humidity}%</p>
              <p><strong>Rain forecast:</strong> {weather.rainForecast}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <p style={{ color: '#558b2f' }}>Enter a city and click “Get Weather”.</p>
          <p style={{ color: '#558b2f' }}>Powered by OpenWeather.</p>
        </div>
      )}
    </div>
  );
}

export default WeatherForecast;
