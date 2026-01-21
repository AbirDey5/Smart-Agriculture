import React, { useEffect, useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Landing from './components/Landing';
import CropManagement from './components/CropManagement';
import WeatherForecast from './components/WeatherForecast';
import MarketPrices from './components/MarketPrices';
import IrrigationManagement from './components/IrrigationManagement';
import Dashboard from './components/Dashboard';
import FAQ from './components/FAQ';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import DiseaseDetection from './components/DiseaseDetecton';
import SetupProfile from './components/SetupProfile';
import ExpertNavbar from './components/ExpertNavbar';
import ExpertDashboard from './components/ExpertDashboard';
import ExpertArticles from './components/ExpertArticles';
import ExpertAnswers from './components/ExpertAnswers';

const FARMER_EMAIL_KEY = 'farmer_email';
const FARMER_ID_KEY = 'farmer_id';
const EXPERT_EMAIL_KEY = 'expert_email';
const FARMER_LOGGED_IN_KEY = 'farmer_logged_in';
const EXPERT_LOGGED_IN_KEY = 'expert_logged_in';

//  Farmer navbar pages
const NAVBAR_PATHS = [
  '/dashboard',
  '/crops',
  '/weather',
  '/market',
  '/irrigation',
  '/faq',
  '/home',
  '/disease-detection',
  '/setup-profile',
];

// Expert navbar pages
const EXPERT_NAVBAR_PATHS = [
  '/expert-dashboard',
  '/expert/answer-questions',
  '/expert/write-articles',
  '/disease-detection',
];


// ---------------- Farmer Navbar ----------------
const ConditionalNavbar = ({
  farmerEmail,
  expertEmail,
  isFarmerLoggedIn,
  isExpertLoggedIn,
  onLogout,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const shouldShowNavbar = NAVBAR_PATHS.some(
    (p) => location.pathname === p || location.pathname.startsWith(`${p}/`)
  );

  // Disease detection rule
  if (location.pathname === '/disease-detection') {
    if (!isFarmerLoggedIn) return null;
  } else if (!shouldShowNavbar) {
    return null;
  }

  const signedInLabel =
    isFarmerLoggedIn ? `Farmer: ${farmerEmail}` :
    isExpertLoggedIn ? `Expert: ${expertEmail}` :
    'Not signed in';

  const showLogout = isFarmerLoggedIn || isExpertLoggedIn;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/home', label: 'Home' },
    { path: '/crops', label: 'Crops' },
    { path: '/weather', label: 'Weather' },
    { path: '/market', label: 'Market' },
    { path: '/irrigation', label: 'Irrigation' },
    { path: '/faq', label: 'FAQ' },
    { path: '/disease-detection', label: 'Disease Detection' },
    { path: '/setup-profile', label: 'Setup Profile' },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const navbarStyles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 48px',
      background: '#f5f5f5',
      borderBottom: '1px solid #e0e0e0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
    },
    brandText: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#1e293b',
      margin: 0,
      letterSpacing: '-0.5px',
    },
    navMenu: {
      display: 'flex',
      listStyle: 'none',
      gap: '32px',
      margin: 0,
      padding: 0,
      alignItems: 'center',
    },
    navItem: {
      fontSize: '0.95rem',
      fontWeight: '500',
      color: '#64748b',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
      position: 'relative',
      padding: '4px 0',
    },
    navItemActive: {
      color: '#1e293b',
      fontWeight: '600',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    userInfo: {
      fontSize: '0.9rem',
      color: '#64748b',
      fontWeight: '500',
    },
    logoutButton: {
      padding: '10px 24px',
      background: '#1e293b',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
  };

  return (
    <nav style={navbarStyles.navbar}>
      {/* Left - Brand */}
      <div style={navbarStyles.brand} onClick={() => navigate('/home')}>
        <h1 style={navbarStyles.brandText}>🌾 DigiFarm</h1>
      </div>

      {/* Center - Navigation Links */}
      <ul style={navbarStyles.navMenu}>
        {navItems.map((item) => (
          <li
            key={item.path}
            style={{
              ...navbarStyles.navItem,
              ...(isActive(item.path) ? navbarStyles.navItemActive : {}),
            }}
            onClick={() => navigate(item.path)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#1e293b';
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.color = '#64748b';
              }
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>

      {/* Right - User Info & Logout */}
      <div style={navbarStyles.rightSection}>
        <span style={navbarStyles.userInfo}>{signedInLabel}</span>
        {showLogout && isFarmerLoggedIn && (
          <button
            style={navbarStyles.logoutButton}
            onClick={onLogout}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#334155';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1e293b';
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};


// ---------------- Expert Navbar ----------------
const ConditionalExpertNavbar = ({ expertEmail, isExpertLoggedIn, onLogout }) => {
  const location = useLocation();

  const shouldShowExpertNavbar = EXPERT_NAVBAR_PATHS.some(
    (p) => location.pathname === p || location.pathname.startsWith(`${p}/`)
  );

  if (location.pathname === '/disease-detection') {
    if (!isExpertLoggedIn) return null;
  } else if (!shouldShowExpertNavbar) {
    return null;
  }

  return <ExpertNavbar expertEmail={expertEmail} onLogout={onLogout} />;
};


// ---------------- App Core ----------------
function AppInner() {
  const navigate = useNavigate();

  // Farmer state
  const [farmerEmail, setFarmerEmail] = useState(() => localStorage.getItem(FARMER_EMAIL_KEY) || '');
  const [farmerId, setFarmerId] = useState(() => localStorage.getItem(FARMER_ID_KEY) || '');
  const [isFarmerLoggedIn, setIsFarmerLoggedIn] = useState(
    () => localStorage.getItem(FARMER_LOGGED_IN_KEY) === 'true'
  );

  // Expert state
  const [expertEmail, setExpertEmail] = useState(() => localStorage.getItem(EXPERT_EMAIL_KEY) || '');
  const [isExpertLoggedIn, setIsExpertLoggedIn] = useState(
    () => localStorage.getItem(EXPERT_LOGGED_IN_KEY) === 'true'
  );

  // Persist farmer
  useEffect(() => {
    localStorage.setItem(FARMER_EMAIL_KEY, farmerEmail);
  }, [farmerEmail]);

  useEffect(() => {
    localStorage.setItem(FARMER_ID_KEY, farmerId);
  }, [farmerId]);

  useEffect(() => {
    localStorage.setItem(FARMER_LOGGED_IN_KEY, String(isFarmerLoggedIn));
  }, [farmerEmail, isFarmerLoggedIn]);

  // Persist expert
  useEffect(() => {
    localStorage.setItem(EXPERT_EMAIL_KEY, expertEmail);
    localStorage.setItem(EXPERT_LOGGED_IN_KEY, String(isExpertLoggedIn));
  }, [expertEmail, isExpertLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();

    setFarmerEmail('');
    setFarmerId('');
    setExpertEmail('');
    setIsFarmerLoggedIn(false);
    setIsExpertLoggedIn(false);

    navigate('/login');
  };

  return (
    <div className="app-container">
      <ConditionalNavbar
        farmerEmail={farmerEmail}
        expertEmail={expertEmail}
        isFarmerLoggedIn={isFarmerLoggedIn}
        isExpertLoggedIn={isExpertLoggedIn}
        onLogout={handleLogout}
      />

      <ConditionalExpertNavbar
        expertEmail={expertEmail}
        isExpertLoggedIn={isExpertLoggedIn}
        onLogout={handleLogout}
      />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route
            path="/login"
            element={
              <Login
                farmerEmail={farmerEmail}
                setFarmerEmail={setFarmerEmail}
                farmerId={farmerId}
                setFarmerId={setFarmerId}
                isFarmerLoggedIn={isFarmerLoggedIn}
                setIsFarmerLoggedIn={setIsFarmerLoggedIn}
                expertEmail={expertEmail}
                setExpertEmail={setExpertEmail}
                isExpertLoggedIn={isExpertLoggedIn}
                setIsExpertLoggedIn={setIsExpertLoggedIn}
              />
            }
          />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard farmerId={farmerId} />} />
          <Route path="/crops" element={<CropManagement farmerId={farmerId} />} />
          <Route path="/weather" element={<WeatherForecast />} />
          <Route path="/market" element={<MarketPrices />} />
          <Route path="/irrigation" element={<IrrigationManagement farmerId={farmerId} />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/home" element={<Home />} />
          <Route path="/disease-detection" element={<DiseaseDetection />} />
          <Route path="/setup-profile" element={<SetupProfile farmerId={farmerId} />} />
          <Route path='faq' element={<FAQ farmerEmail={farmerEmail} />} />
          <Route path="/expert-dashboard" element={<ExpertDashboard />} />
          <Route path="/expert/write-articles" element={<ExpertArticles expertEmail={expertEmail} />} />
          <Route path="/expert/answer-questions" element={<ExpertAnswers expertEmail={expertEmail} />} />
        </Routes>
      </div>
    </div>
  );
}


// ---------------- Router Wrapper ----------------
export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}
