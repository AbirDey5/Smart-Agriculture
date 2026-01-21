import React, { useState } from 'react';
import { apiPostForm, apiPostJson } from '../api';

function Auth() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  const [login, setLogin] = useState({ email: '', password: '', role: 'USER' });
  const [registerRole, setRegisterRole] = useState('USER'); // 'USER' | 'EXPERT'

  const [userReg, setUserReg] = useState({ name: '', email: '', password: '', phone: '', location: '' });
  const [expertReg, setExpertReg] = useState({ name: '', email: '', password: '', phone: '', expertise: '', experience: '0', document: null });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const run = async (fn) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await fn();
      setResult(data);
    } catch (e) {
      setError(e.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const doLogin = () => run(() => apiPostJson('/api/login', login));
  const doRegisterUser = () => run(() => apiPostJson('/api/register/user', userReg));

  const doRegisterExpert = () => run(() => {
    const fd = new FormData();
    fd.append('name', expertReg.name);
    fd.append('email', expertReg.email);
    fd.append('password', expertReg.password);
    fd.append('phone', expertReg.phone);
    fd.append('expertise', expertReg.expertise);
    fd.append('experience', expertReg.experience);
    if (expertReg.document) fd.append('document', expertReg.document);
    return apiPostForm('/api/register/expert', fd);
  });

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError('');
    setResult(null);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">🔐 Authentication</h1>
      <p className="page-subtitle">Login or create an account as a User or Expert</p>

      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            className={`btn ${mode === 'login' ? '' : 'btn-secondary'}`}
            onClick={() => switchMode('login')}
            disabled={loading}
          >
            Login
          </button>
          <button
            type="button"
            className={`btn ${mode === 'register' ? '' : 'btn-secondary'}`}
            onClick={() => switchMode('register')}
            disabled={loading}
          >
            Register
          </button>
        </div>
      </div>

      {error ? (
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      ) : null}

      {result ? (
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ marginTop: 0 }}>Response</h3>
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      ) : null}

      {mode === 'login' ? (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Login</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              doLogin();
            }}
          >
            <div className="form-group">
              <label>Email</label>
              <input
                value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                placeholder="Email"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={login.password}
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>

            <div className="form-group">
              <label>Login as</label>
              <select value={login.role} onChange={(e) => setLogin({ ...login, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="EXPERT">Expert</option>
              </select>
            </div>

            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>
        </div>
      ) : (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Register</h3>

          <div className="form-group">
            <label>Account type</label>
            <select
              value={registerRole}
              onChange={(e) => setRegisterRole(e.target.value)}
              disabled={loading}
            >
              <option value="USER">User</option>
              <option value="EXPERT">Expert</option>
            </select>
          </div>

          {registerRole === 'USER' ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                doRegisterUser();
              }}
            >
              <div className="form-group">
                <label>Name</label>
                <input value={userReg.name} onChange={(e) => setUserReg({ ...userReg, name: e.target.value })} placeholder="Full name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input value={userReg.email} onChange={(e) => setUserReg({ ...userReg, email: e.target.value })} placeholder="Email" autoComplete="email" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={userReg.password} onChange={(e) => setUserReg({ ...userReg, password: e.target.value })} placeholder="Password" autoComplete="new-password" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={userReg.phone} onChange={(e) => setUserReg({ ...userReg, phone: e.target.value })} placeholder="Phone" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input value={userReg.location} onChange={(e) => setUserReg({ ...userReg, location: e.target.value })} placeholder="Location" />
              </div>
              <button className="btn" type="submit" disabled={loading}>
                {loading ? 'Registering…' : 'Register as User'}
              </button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                doRegisterExpert();
              }}
            >
              <div className="form-group">
                <label>Name</label>
                <input value={expertReg.name} onChange={(e) => setExpertReg({ ...expertReg, name: e.target.value })} placeholder="Full name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input value={expertReg.email} onChange={(e) => setExpertReg({ ...expertReg, email: e.target.value })} placeholder="Email" autoComplete="email" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={expertReg.password} onChange={(e) => setExpertReg({ ...expertReg, password: e.target.value })} placeholder="Password" autoComplete="new-password" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={expertReg.phone} onChange={(e) => setExpertReg({ ...expertReg, phone: e.target.value })} placeholder="Phone" />
              </div>
              <div className="form-group">
                <label>Expertise</label>
                <input value={expertReg.expertise} onChange={(e) => setExpertReg({ ...expertReg, expertise: e.target.value })} placeholder="E.g., Soil, Crops, Pest control" />
              </div>
              <div className="form-group">
                <label>Experience (years)</label>
                <input type="number" min="0" value={expertReg.experience} onChange={(e) => setExpertReg({ ...expertReg, experience: e.target.value })} placeholder="Years" />
              </div>
              <div className="form-group">
                <label>Verification document (PDF/JPG/PNG)</label>
                <input
                  type="file"
                  accept="application/pdf,image/png,image/jpeg"
                  onChange={(e) =>
                    setExpertReg({
                      ...expertReg,
                      document: e.target.files && e.target.files[0] ? e.target.files[0] : null,
                    })
                  }
                />
              </div>
              <button className="btn" type="submit" disabled={loading}>
                {loading ? 'Registering…' : 'Register as Expert'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Auth;
