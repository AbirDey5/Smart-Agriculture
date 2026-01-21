import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import herobackground from '../components/Images/illustration-man-woman-organic-farming-concept/3479732.jpg'
import qualitygarden from '../components/Images/drawn-beautiful-spring-landscape-background/4963834.jpg'
import farmequipment from '../components/Images/agricultural-machines-transport-set-flat-isolated-vehicles-with-tractors-excavators-combine-harveste/2209.q803.029.S.m012.c12.Agricultural machines transport flat set.jpg'
import happyfarmer from '../components/Images/support-local-farmers-concept-illustration/4110299.jpg'
import mountain from '../components/Images/landscape-mountains-forest-flying-birds/GST CAM 942-06.jpg'



function Landing({ onFinish }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleStart = () => {
    if (onFinish) onFinish();
    else navigate('/login');
  };

  const handleFarmerClick = () => {
    navigate('/register');
  };

  const handleExpertClick = () => {
    navigate('/register');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <>
      <style>{`
        .landing-modern {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
          background: #fafafa;
        }

        .landing-header {
          background: linear-gradient(135deg, #b8dfd8 0%, #d4e7e4 100%);
          padding: 1.5rem 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .landing-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .landing-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .landing-logo h2 {
          font-size: 1.75rem;
          color: #1a3d3a;
          font-weight: 700;
          margin: 0;
        }

        .landing-menu {
          display: flex;
          gap: 2rem;
          flex: 1;
          justify-content: center;
        }

        .landing-menu a {
          color: #2d5651;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.3s;
        }

        .landing-menu a:hover {
          color: #1a3d3a;
        }

        .landing-nav-btn {
          background: #1a3d3a;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .landing-nav-btn:hover {
          background: #0f2926;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(26, 61, 58, 0.3);
        }

        .landing-hero-modern {
          padding: 3rem 2rem;
          position: relative;
          overflow: hidden;
          background: #e8f5f0;
        }

        .landing-hero-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          background: linear-gradient(135deg, #b8dfd8 0%, #f5e6d3 50%, #d4e7e4 100%);
          border-radius: 32px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .landing-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .landing-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(0.9);  /* 0.8 = 80% size, adjust as needed */
        }

        .landing-hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          padding: 4rem 3rem;
          min-height: 600px;
        }

        .landing-hero-title {
          font-size: 3.5rem;
          line-height: 1.2;
          color: #1a3d3a;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .landing-hero-subtitle {
          font-size: 1.1rem;
          color: #2d5651;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .landing-stats-row {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .landing-stat-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: white;
          padding: 1.25rem 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          flex: 1;
          min-width: 200px;
        }

        .landing-stat-icon {
          font-size: 2.5rem;
        }

        .landing-stat-content h3 {
          font-size: 1.75rem;
          color: #1a3d3a;
          margin: 0 0 0.25rem 0;
          font-weight: 700;
        }

        .landing-stat-content p {
          font-size: 0.9rem;
          color: #5a7874;
          margin: 0;
        }

        .landing-hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .landing-btn-primary {
          background: linear-gradient(135deg, #7cb342 0%, #9ccc65 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(124, 179, 66, 0.3);
        }

        .landing-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(124, 179, 66, 0.4);
        }

        .landing-btn-secondary {
          background: #1a3d3a;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .landing-btn-secondary:hover {
          background: #0f2926;
          transform: translateY(-2px);
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 1.2rem;
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.5);
        }

        .landing-quality-section {
          padding: 5rem 0;
          background: white;
        }

        .landing-quality-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .landing-quality-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .landing-quality-image {
          position: relative;
          height: 500px;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .landing-quality-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .landing-quality-content h2 {
          font-size: 2.5rem;
          line-height: 1.3;
          color: #1a3d3a;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .landing-quality-content p {
          font-size: 1rem;
          color: #5a7874;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .landing-btn-dark {
          background: #1a3d3a;
          color: white;
          border: none;
          padding: 0.9rem 1.8rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .landing-btn-dark:hover {
          background: #0f2926;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(26, 61, 58, 0.3);
        }

        .landing-features-modern {
          padding: 5rem 0;
          background: linear-gradient(135deg, #fef8f0 0%, #f9f9f9 100%);
        }

        .landing-section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .landing-section-header h2 {
          font-size: 2.5rem;
          color: #1a3d3a;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .landing-section-header p {
          font-size: 1.1rem;
          color: #5a7874;
        }

        .landing-feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .landing-feature-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          transition: all 0.3s;
          border: 1px solid #e8e8e8;
        }

        .landing-feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .landing-feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .landing-feature-card h3 {
          font-size: 1.2rem;
          color: #1a3d3a;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .landing-feature-card p {
          font-size: 0.95rem;
          color: #5a7874;
          line-height: 1.6;
        }

        .landing-trust-section {
          padding: 5rem 0;
          background: white;
          text-align: center;
        }

        .landing-trust-section h2 {
          font-size: 2.5rem;
          color: #1a3d3a;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .landing-trust-subtitle {
          font-size: 1rem;
          color: #5a7874;
          margin-bottom: 3rem;
        }

        .landing-partners {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .landing-partner {
          font-size: 1.3rem;
          color: #999;
          font-weight: 600;
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        .landing-partner:hover {
          opacity: 1;
        }

        .landing-equipment-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #f0f8f5 0%, #f9f9f9 100%);
        }

        .landing-equipment-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .landing-equipment-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .landing-equipment-image {
          position: relative;
          height: 500px;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .landing-equipment-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .landing-equipment-content h2 {
          font-size: 2.5rem;
          line-height: 1.3;
          color: #1a3d3a;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .landing-equipment-content p {
          font-size: 1rem;
          color: #5a7874;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .landing-consumer-section {
          padding: 5rem 0;
          background: white;
        }

        .landing-consumer-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .landing-consumer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .landing-consumer-content h2 {
          font-size: 2.5rem;
          line-height: 1.3;
          color: #1a3d3a;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .landing-consumer-content p {
          font-size: 1rem;
          color: #5a7874;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .landing-consumer-stats {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .landing-consumer-stat {
          background: linear-gradient(135deg, #1a3d3a 0%, #2d5651 100%);
          color: white;
          padding: 1.5rem 2rem;
          border-radius: 12px;
          position: relative;
        }

        .landing-consumer-stat h3 {
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
        }

        .landing-consumer-stat p {
          font-size: 0.9rem;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
        }

        .landing-rating-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #7cb342;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .landing-consumer-image {
          position: relative;
          height: 500px;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .landing-consumer-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .landing-info-section {
          padding: 3rem 2rem;
          background: #e8f5f0;
          position: relative;
          overflow: hidden;
        }

        .landing-info-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          background: linear-gradient(to bottom, #b8dfd8 0%, #d4e7e4 40%, #90EE90 100%);
          border-radius: 32px;
          overflow: hidden;
          position: relative;
          min-height: 500px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .landing-info-bg-image {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 0;
        }

        .landing-info-bg-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .landing-info-content {
          position: relative;
          z-index: 1;
          padding: 4rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 500px;
        }

        .landing-info-card {
          background: white;
          border-radius: 24px;
          padding: 3rem;
          text-align: center;
          max-width: 700px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .landing-info-card h2 {
          font-size: 2rem;
          color: #1a3d3a;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .landing-info-card p {
          font-size: 1rem;
          color: #5a7874;
          margin-bottom: 2rem;
        }

        .landing-info-form {
          display: flex;
          gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .landing-form-group {
          flex: 1;
          display: flex;
          align-items: center;
          background: #f5f5f5;
          border-radius: 10px;
          padding: 0 1rem;
          border: 2px solid transparent;
          transition: border-color 0.3s;
        }

        .landing-form-group:focus-within {
          border-color: #7cb342;
        }

        .landing-form-icon {
          font-size: 1.2rem;
          margin-right: 0.5rem;
        }

        .landing-form-group input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 1rem 0;
          font-size: 1rem;
          outline: none;
        }

        .landing-form-btn {
          background: linear-gradient(135deg, #7cb342 0%, #9ccc65 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(124, 179, 66, 0.3);
          white-space: nowrap;
        }

        .landing-form-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(124, 179, 66, 0.4);
        }

        @media (max-width: 768px) {
          .landing-nav {
            flex-direction: column;
            align-items: flex-start;
          }

          .landing-menu {
            flex-direction: column;
            gap: 0.5rem;
          }

          .landing-hero-grid,
          .landing-quality-grid,
          .landing-equipment-grid,
          .landing-consumer-grid {
            grid-template-columns: 1fr;
          }

          .landing-hero-title {
            font-size: 2.5rem;
          }

          .landing-stats-row {
            flex-direction: column;
          }

          .landing-quality-image,
          .landing-equipment-image,
          .landing-consumer-image {
            height: 350px;
          }

          .landing-info-form {
            flex-direction: column;
          }

          .landing-feature-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="landing-modern">
        {/* Header */}
        <header className="landing-header">
          <div className="landing-container">
            <div className="landing-nav">
              <div className="landing-logo">
                <h2>DigiFarm</h2>
              </div>
              <nav className="landing-menu">
                <a href="#home">Home</a>
                <a href="#features">Features</a>
                <a href="#how-it-works">How it's work</a>
                <a href="#categories">Categories</a>
              </nav>
              <button className="landing-nav-btn" onClick={handleStart}>
                Start Free Trial
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="landing-hero-modern">
          <div className="landing-hero-wrapper">
            {/* Background Image - Add your hero farm illustration here */}
            <div className="landing-hero-bg">
              <img src={herobackground} alt="Farm landscape background" />
              <div className="image-placeholder">Hero Farm Background Image (Add here)</div>
            </div>

            <div className="landing-hero-grid">
              <div className="landing-hero-content">
                <h1 className="landing-hero-title">
                  Start to contribute<br />
                  with reliable farmers.
                </h1>
                <p className="landing-hero-subtitle">
                  We help you grow healthier, high-quality crops & contribute.
                </p>
                
                <div className="landing-stats-row">
                  <div className="landing-stat-box">
                    <div className="landing-stat-icon">🌾</div>
                    <div className="landing-stat-content">
                      <h3>80,280+</h3>
                      <p>Registered Farms around</p>
                    </div>
                  </div>
                  <div className="landing-stat-box">
                    <div className="landing-stat-icon">👨‍🌾</div>
                    <div className="landing-stat-content">
                      <h3>8,520+</h3>
                      <p>Professional workers</p>
                    </div>
                  </div>
                </div>

                <div className="landing-hero-buttons">
                  <button className="landing-btn-primary" onClick={handleFarmerClick}>
                    Join as a Farmer
                  </button>
                  <button className="landing-btn-secondary" onClick={handleExpertClick}>
                    Join as a Expert
                  </button>
                </div>
              </div>
              
              <div className="landing-hero-right">
                {/* Content overlays the background image */}
              </div>
            </div>
          </div>
        </section>

        {/* Quality Section */}
        <section className="landing-quality-section">
          <div className="landing-quality-wrapper">
            <div className="landing-quality-grid">
              <div className="landing-quality-image">
                {/* Add your quality/gardening illustration image here */}
                <img src={qualitygarden} alt="Quality gardening" />
                <div className="image-placeholder">Quality Garden Image (Add here)</div>
              </div>
              <div className="landing-quality-content">
                <h2>
                  Verified produce at<br />
                  a glance quality<br />
                  without risk.
                </h2>
                <p>
                  Get verified certified organic products. It helps you select
                  preferred or verified and verified top quality products direct
                  from trusted farmers and exclusive easy ordering.
                </p>
                <button className="landing-btn-dark" onClick={handleStart}>
                  Read Full Story →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Important Things Section */}
        <section className="landing-features-modern">
          <div className="landing-container">
            <div className="landing-section-header">
              <h2>Important thing in farming.</h2>
              <p>Boost by selecting anything for your farm progress by following the right way.</p>
            </div>

            <div className="landing-feature-grid">
              <div className="landing-feature-card">
                <div className="landing-feature-icon">🚜</div>
                <h3>Make sure everything involved</h3>
                <p>It is one of the greatest achievements in agricultural farming that makes us excellent.</p>
              </div>
              <div className="landing-feature-card">
                <div className="landing-feature-icon">🌾</div>
                <h3>Plants or an animal raised on a farm</h3>
                <p>It focuses on from seed to harvest farm crops is something they will appreciate and farming.</p>
              </div>
              <div className="landing-feature-card">
                <div className="landing-feature-icon">🐞</div>
                <h3>Farming is a idea a way to death money</h3>
                <p>Regenerative agriculture is a way to heal the land to learn our future-saving farms.</p>
              </div>
              <div className="landing-feature-card">
                <div className="landing-feature-icon">💻</div>
                <h3>Farmers to build technology</h3>
                <p>Make farmer to build up the future of your farm with the connected feed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="landing-trust-section">
          <div className="landing-container">
            <h2>Trusted by over 20,000 Partners</h2>
            <p className="landing-trust-subtitle">
              Our partner exclusive for solo, farmer is something important for growth the country
            </p>
            <div className="landing-partners">
              <div className="landing-partner">DocuSign</div>
              <div className="landing-partner">PIPEDRIVE</div>
              <div className="landing-partner">GitHub</div>
              <div className="landing-partner">shopify</div>
              <div className="landing-partner">Uber</div>
              <div className="landing-partner">Google</div>
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="landing-equipment-section">
          <div className="landing-equipment-wrapper">
            <div className="landing-equipment-grid">
              <div className="landing-equipment-image">
                {/* Add your barn/windmill illustration image here */}
                <img src={farmequipment} alt="Farm equipment" />
                <div className="image-placeholder">Barn & Windmill Image (Add here)</div>
              </div>
              <div className="landing-equipment-content">
                <h2>
                  The right farm<br />
                  equipment for all<br />
                  needs.
                </h2>
                <p>
                  Our product portfolio covers all requirements. It does not make a
                  difference if you are looking for an efficient machinery we can
                  power, package, we will keep you in your selection.
                </p>
                <button className="landing-btn-dark" onClick={handleStart}>
                  Read Full Story →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Consumer Section */}
        <section className="landing-consumer-section">
          <div className="landing-consumer-wrapper">
            <div className="landing-consumer-grid">
              <div className="landing-consumer-content">
                <h2>
                  everyone consumes<br />
                  processed products<br />
                  from farmers.
                </h2>
                <p>
                  From planting locally farm & processed can create best for you.
                </p>
                <div className="landing-consumer-stats">
                  <div className="landing-consumer-stat">
                    <h3>10,000+</h3>
                    <p>Reach on Global people</p>
                  </div>
                  <div className="landing-consumer-stat">
                    <h3>4.9</h3>
                    <p>Yearly Rating</p>
                    <div className="landing-rating-badge">⭐</div>
                  </div>
                </div>
              </div>
              <div className="landing-consumer-image">
                {/* Add your barn/harvest illustration image here */}
                <img src={happyfarmer} alt="Farm produce" />
                <div className="image-placeholder">Harvest Barn Image (Add here)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Information Form Section */}
        <section className="landing-info-section">
          <div className="landing-info-wrapper">
            {/* Full background image */}
            <div className="landing-info-bg-image">
              <img src={mountain} alt="Mountain landscape background" />
              <div className="image-placeholder">Mountain Landscape Background (Add here)</div>
            </div>
            
            <div className="landing-info-content">
              <div className="landing-info-card">
                <h2>Get information farm</h2>
                <p>Write any email and we'll send to you farm information directly.</p>
                <form className="landing-info-form" onSubmit={handleEmailSubmit}>
                  <div className="landing-form-group">
                    <span className="landing-form-icon">📧</span>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="landing-form-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Landing;