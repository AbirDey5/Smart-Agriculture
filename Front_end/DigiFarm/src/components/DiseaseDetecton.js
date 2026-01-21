import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);
  const [diseaseClasses, setDiseaseClasses] = useState([]);

  const API_BASE_URL = 'http://localhost:8080/api/disease-detection';

  // Check health status on component mount
  useEffect(() => {
    checkHealth();
    fetchDiseaseClasses();
  }, []);

  const checkHealth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      setHealthStatus(response.data);
    } catch (err) {
      console.error('Health check failed:', err);
      setHealthStatus({ status: 'unhealthy' });
    }
  };

  const fetchDiseaseClasses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/classes`);
      setDiseaseClasses(response.data.classes || []);
    } catch (err) {
      console.error('Failed to fetch disease classes:', err);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image/(jpeg|jpg|png)')) {
        setError('Please select a valid image file (JPEG or PNG)');
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setPrediction(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect({ target: { files: [file] } });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPrediction(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPrediction(null);
    setError(null);
  };

  const getSeverityColor = (confidence) => {
    if (confidence > 0.8) return '#e74c3c';
    if (confidence > 0.6) return '#f39c12';
    return '#27ae60';
  };

  return (
    <>
      <style>{`
        .disease-detection-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          background: #f5f7fa;
          min-height: 100vh;
        }

        .disease-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .disease-header h1 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .disease-header p {
          font-size: 1.1rem;
          color: #7f8c8d;
        }

        .health-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          margin-top: 1rem;
        }

        .health-badge.healthy {
          background: #d4edda;
          color: #155724;
        }

        .health-badge.unhealthy {
          background: #f8d7da;
          color: #721c24;
        }

        .disease-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .upload-section {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .upload-section h2 {
          font-size: 1.5rem;
          color: #2c3e50;
          margin-bottom: 1.5rem;
        }

        .upload-area {
          border: 3px dashed #bdc3c7;
          border-radius: 12px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background: #f8f9fa;
        }

        .upload-area:hover {
          border-color: #3498db;
          background: #ecf9ff;
        }

        .upload-area.has-file {
          border-color: #27ae60;
          background: #eafaf1;
        }

        .upload-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .upload-area p {
          color: #7f8c8d;
          margin-bottom: 1rem;
        }

        .upload-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .upload-btn:hover {
          background: #2980b9;
        }

        .file-input {
          display: none;
        }

        .preview-section {
          margin-top: 1.5rem;
        }

        .preview-image {
          width: 100%;
          max-height: 300px;
          object-fit: contain;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn-analyze {
          flex: 1;
          background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-analyze:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(39, 174, 96, 0.4);
        }

        .btn-analyze:disabled {
          background: #95a5a6;
          cursor: not-allowed;
        }

        .btn-reset {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-reset:hover {
          background: #c0392b;
        }

        .results-section {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .results-section h2 {
          font-size: 1.5rem;
          color: #2c3e50;
          margin-bottom: 1.5rem;
        }

        .loading-state {
          text-align: center;
          padding: 3rem;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #e74c3c;
          margin-bottom: 1rem;
        }

        .prediction-result {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .prediction-result h3 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }

        .confidence-bar {
          background: rgba(255, 255, 255, 0.3);
          height: 12px;
          border-radius: 6px;
          margin-top: 1rem;
          overflow: hidden;
        }

        .confidence-fill {
          height: 100%;
          background: white;
          border-radius: 6px;
          transition: width 0.5s;
        }

        .prediction-details {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 12px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e9ecef;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-label {
          color: #7f8c8d;
          font-weight: 500;
        }

        .detail-value {
          color: #2c3e50;
          font-weight: 600;
        }

        .top-predictions {
          margin-top: 1.5rem;
        }

        .top-predictions h4 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .prediction-item {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 0.75rem;
          border-left: 4px solid #3498db;
        }

        .prediction-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .prediction-name {
          font-weight: 600;
          color: #2c3e50;
        }

        .prediction-confidence {
          font-weight: 700;
          color: #27ae60;
        }

        .mini-confidence-bar {
          background: #e9ecef;
          height: 6px;
          border-radius: 3px;
          overflow: hidden;
        }

        .mini-confidence-fill {
          height: 100%;
          background: linear-gradient(90deg, #3498db, #27ae60);
          border-radius: 3px;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #7f8c8d;
        }

        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .info-section {
          background: #e8f5e9;
          padding: 1.5rem;
          border-radius: 12px;
          margin-top: 2rem;
          border-left: 4px solid #27ae60;
        }

        .info-section h4 {
          color: #1b5e20;
          margin-bottom: 0.75rem;
        }

        .info-section ul {
          color: #2e7d32;
          margin-left: 1.5rem;
        }

        .info-section li {
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .disease-content {
            grid-template-columns: 1fr;
          }

          .disease-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="disease-detection-container">
        <div className="disease-header">
          <h1>🌿 Plant Disease Detection</h1>
          <p>Upload a plant leaf image to detect diseases using AI</p>
          {healthStatus && (
            <div className={`health-badge ${healthStatus.status === 'healthy' ? 'healthy' : 'unhealthy'}`}>
              {healthStatus.status === 'healthy' ? '✓' : '✗'} 
              ML Service: {healthStatus.status}
            </div>
          )}
        </div>

        <div className="disease-content">
          {/* Upload Section */}
          <div className="upload-section">
            <h2>📤 Upload Image</h2>
            
            <div 
              className={`upload-area ${selectedFile ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <div className="upload-icon">
                {selectedFile ? '✅' : '📁'}
              </div>
              <p>
                {selectedFile 
                  ? `Selected: ${selectedFile.name}` 
                  : 'Drag & drop an image here or click to browse'}
              </p>
              <button className="upload-btn" type="button">
                {selectedFile ? 'Change Image' : 'Select Image'}
              </button>
              <input
                id="fileInput"
                type="file"
                className="file-input"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleFileSelect}
              />
            </div>

            {previewUrl && (
              <div className="preview-section">
                <img src={previewUrl} alt="Preview" className="preview-image" />
                <div className="action-buttons">
                  <button 
                    className="btn-analyze" 
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? 'Analyzing...' : '🔍 Analyze Disease'}
                  </button>
                  <button className="btn-reset" onClick={handleReset}>
                    🔄 Reset
                  </button>
                </div>
              </div>
            )}

            <div className="info-section">
              <h4>ℹ️ Guidelines</h4>
              <ul>
                <li>Upload clear images of plant leaves</li>
                <li>Supported formats: JPEG, PNG</li>
                <li>Maximum file size: 10MB</li>
                <li>Better lighting = Better results</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="results-section">
            <h2>📊 Analysis Results</h2>

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Analyzing your plant image...</p>
              </div>
            )}

            {!loading && !prediction && !error && (
              <div className="empty-state">
                <div className="empty-state-icon">🔬</div>
                <p>Upload an image to get started</p>
              </div>
            )}

            {prediction && !loading && (
              <>
                <div className="prediction-result">
                  <h3>{prediction.prediction || prediction.disease}</h3>
                  <p>Confidence: {((prediction.confidence || 0) * 100).toFixed(2)}%</p>
                  <div className="confidence-bar">
                    <div 
                      className="confidence-fill" 
                      style={{ width: `${(prediction.confidence || 0) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {prediction.details && (
                  <div className="prediction-details">
                    <div className="detail-item">
                      <span className="detail-label">Disease Class</span>
                      <span className="detail-value">{prediction.details.class || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Severity</span>
                      <span className="detail-value" style={{ 
                        color: getSeverityColor(prediction.confidence) 
                      }}>
                        {prediction.confidence > 0.8 ? 'High' : 
                         prediction.confidence > 0.6 ? 'Medium' : 'Low'}
                      </span>
                    </div>
                    {prediction.details.description && (
                      <div className="detail-item">
                        <span className="detail-label">Description</span>
                        <span className="detail-value">{prediction.details.description}</span>
                      </div>
                    )}
                  </div>
                )}

                {prediction.top_predictions && prediction.top_predictions.length > 0 && (
                  <div className="top-predictions">
                    <h4>Top Predictions</h4>
                    {prediction.top_predictions.map((pred, index) => (
                      <div key={index} className="prediction-item">
                        <div className="prediction-item-header">
                          <span className="prediction-name">{pred.class || pred.name}</span>
                          <span className="prediction-confidence">
                            {((pred.confidence || 0) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="mini-confidence-bar">
                          <div 
                            className="mini-confidence-fill" 
                            style={{ width: `${(pred.confidence || 0) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {prediction.recommendation && (
                  <div className="info-section" style={{ background: '#fff3cd', borderColor: '#f39c12' }}>
                    <h4>💡 Recommendation</h4>
                    <p style={{ color: '#856404', margin: 0 }}>{prediction.recommendation}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DiseaseDetection;