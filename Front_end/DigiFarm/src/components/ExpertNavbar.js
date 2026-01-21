import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ExpertNavbar({ expertEmail, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/expert-dashboard', label: 'Dashboard' },
    { path: '/expert/answer-questions', label: 'Answer Questions' },
    { path: '/expert/write-articles', label: 'Write Articles' },
    { path: '/disease-detection', label: 'Disease Detection' }
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const navbarStyles = {
    navbar: {
      backgroundColor: '#f5f5f5',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: '0 40px',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1400px',
      margin: '0 auto',
      height: '70px',
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      fontSize: '22px',
      fontWeight: '600',
      color: '#2d3748',
      transition: 'color 0.3s ease',
    },
    brandText: {
      margin: 0,
      fontSize: '22px',
      fontWeight: '600',
    },
    navMenu: {
      display: 'flex',
      listStyle: 'none',
      gap: '35px',
      margin: 0,
      padding: 0,
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    navItem: {
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '500',
      color: '#4a5568',
      transition: 'color 0.3s ease',
      padding: '8px 0',
      borderBottom: '2px solid transparent',
    },
    navItemActive: {
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      color: '#2d3748',
      padding: '8px 0',
      borderBottom: '2px solid #3182ce',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#4a5568',
    },
    logoutButton: {
      backgroundColor: '#3182ce',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
  };

  return (
    <nav style={navbarStyles.navbar}>
      <div style={navbarStyles.container}>
        <div style={navbarStyles.brand} onClick={() => navigate('/expert-dashboard')}>
          <span>👨‍🌾</span>
          <h2 style={navbarStyles.brandText}>Expert Portal</h2>
        </div>

        <ul style={navbarStyles.navMenu}>
          {navItems.map((item) => (
            <li
              key={item.path}
              style={isActive(item.path) ? navbarStyles.navItemActive : navbarStyles.navItem}
              onClick={() => navigate(item.path)}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.color = '#2d3748';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.color = '#4a5568';
                }
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>

        <div style={navbarStyles.rightSection}>
          <div style={navbarStyles.userInfo}>
            <span>👤</span>
            <span>{expertEmail}</span>
          </div>
          <button
            style={navbarStyles.logoutButton}
            onClick={onLogout}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2c5aa0';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#3182ce';
            }}
          >
            <span>Logout</span>
            <span>🚪</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default ExpertNavbar;
