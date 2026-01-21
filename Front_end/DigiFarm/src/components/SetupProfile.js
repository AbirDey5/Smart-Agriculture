import { useState } from 'react';
import { addField } from '../api';

export default function SetupProfile({ farmerId }) {
  const [field, setField] = useState({
    fieldName: '',
    area: '',
    crop: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const missingFarmer = !farmerId;

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (missingFarmer) {
      alert('Farmer ID missing. Please log in again.');
      return;
    }

    if (!field.fieldName || !field.area || !field.crop) {
      alert('All fields required');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await addField(farmerId, field);
      alert('Field saved successfully');
      setField({ fieldName: '', area: '', crop: '' });
    } catch (e) {
      setError(e.message || 'Failed to save field');
      alert('Error: ' + (e.message || 'Failed to save field'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Setup Farm Fields</h2>

      {error && (
        <div className="card" style={{ background: '#fff3e0', color: '#c62828', marginBottom: '1rem' }}>
          <strong>{error}</strong>
        </div>
      )}

      <div className="card">
        <input
          name="fieldName"
          placeholder="Field Name"
          value={field.fieldName}
          onChange={handleChange}
        />

        <input
          name="area"
          type="number"
          placeholder="Area (acres)"
          value={field.area}
          onChange={handleChange}
        />

        <input
          name="crop"
          placeholder="Crop Name"
          value={field.crop}
          onChange={handleChange}
        />

        <button onClick={submit} disabled={loading || missingFarmer}>
          {loading ? 'Saving...' : 'Save Field'}
        </button>
      </div>
    </div>
  );
}
