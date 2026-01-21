import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("farmer"); // 'farmer' | 'expert'

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    village: "",
    city: "",
    district: "",
    country: "",
    specialization: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const title = useMemo(
    () => (role === "farmer" ? "Register Farmer" : "Register Expert"),
    [role]
  );

  useEffect(() => {
    setError("");
    setSuccessMsg("");
    // keep filled fields; only clear specialization when switching to farmer
    if (role === "farmer") {
      setForm((prev) => ({ ...prev, specialization: "" }));
    }
  }, [role]);

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      if (!form.name || !form.email || !form.password) {
        setError("Name, email, and password are required.");
        return;
      }

      const endpoint =
        role === "farmer"
          ? "http://localhost:8080/api/register/farmer"
          : "http://localhost:8080/api/register/expert";

      const payload =
        role === "farmer"
          ? {
              name: form.name,
              email: form.email,
              password: form.password,
              phone: form.phone,
              village: form.village,
              city: form.city,
              district: form.district,
              country: form.country,
            }
          : {
              name: form.name,
              email: form.email,
              password: form.password,
              phone: form.phone,
              village: form.village,
              city: form.city,
              district: form.district,
              country: form.country,
              specialization: form.specialization,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        // backend returns { error: "..." } for failures
        const msg =
          (data && (data.error || data.message)) ||
          `Registration failed (${res.status})`;
        setError(msg);
        return;
      }

      setSuccessMsg(data?.message || "Registered successfully! Redirecting to login…");

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (err) {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      overflow: 'hidden',
    },
    leftPanel: {
      flex: '0 0 45%',
      background: 'linear-gradient(135deg, #2c5364 0%, #203a43 50%, #0f2027 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 40px',
      position: 'relative',
      color: 'white',
    },
    leftContent: {
      textAlign: 'center',
      maxWidth: '400px',
      zIndex: 2,
    },
    welcomeTitle: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '20px',
      color: 'white',
    },
    welcomeText: {
      fontSize: '1.1rem',
      lineHeight: '1.7',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '40px',
    },
    decorationIcon: {
      fontSize: '6rem',
      marginBottom: '30px',
    },
    rightPanel: {
      flex: '0 0 55%',
      background: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      overflowY: 'auto',
    },
    formWrapper: {
      width: '100%',
      maxWidth: '480px',
    },
    header: {
      marginBottom: '35px',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#1e293b',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '0.95rem',
      color: '#64748b',
    },
    roleToggle: {
      display: 'flex',
      gap: '12px',
      marginBottom: '25px',
    },
    roleButton: {
      flex: 1,
      padding: '10px',
      border: '2px solid #e2e8f0',
      background: 'white',
      borderRadius: '10px',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: '#64748b',
    },
    roleButtonActive: {
      background: '#1e293b',
      color: 'white',
      borderColor: '#1e293b',
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '15px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontSize: '0.85rem',
      fontWeight: '600',
      color: '#334155',
      marginBottom: '6px',
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      fontSize: '0.95rem',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
    },
    inputDisabled: {
      background: '#f8fafc',
      cursor: 'not-allowed',
    },
    errorMsg: {
      color: '#dc2626',
      background: '#fef2f2',
      padding: '10px 14px',
      borderRadius: '8px',
      marginBottom: '15px',
      fontSize: '0.85rem',
      fontWeight: '500',
      border: '1px solid #fecaca',
    },
    successMsg: {
      color: '#16a34a',
      background: '#f0fdf4',
      padding: '10px 14px',
      borderRadius: '8px',
      marginBottom: '15px',
      fontSize: '0.85rem',
      fontWeight: '500',
      border: '1px solid #bbf7d0',
    },
    submitButton: {
      width: '100%',
      padding: '12px',
      background: '#1e293b',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px',
    },
    submitButtonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
    },
    footer: {
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#64748b',
    },
    link: {
      color: '#1e293b',
      fontWeight: '600',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      {/* Left Decorative Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.leftContent}>
          <div style={styles.decorationIcon}>🌾</div>
          <h2 style={styles.welcomeTitle}>Welcome to DigiFarm</h2>
          <p style={styles.welcomeText}>
            Join our community of farmers and agricultural experts. 
            Share knowledge, get expert advice, and grow together.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.formWrapper}>
          <div style={styles.header}>
            <h1 style={styles.title}>{title}</h1>
            <p style={styles.subtitle}>Create your account to get started</p>
          </div>

          {/* Role Toggle Buttons */}
          <div style={styles.roleToggle}>
            <button
              type="button"
              onClick={() => setRole('farmer')}
              disabled={loading}
              style={{
                ...styles.roleButton,
                ...(role === 'farmer' ? styles.roleButtonActive : {}),
                ...(loading ? styles.inputDisabled : {}),
              }}
            >
              🌾 Farmer
            </button>
            <button
              type="button"
              onClick={() => setRole('expert')}
              disabled={loading}
              style={{
                ...styles.roleButton,
                ...(role === 'expert' ? styles.roleButtonActive : {}),
                ...(loading ? styles.inputDisabled : {}),
              }}
            >
              👨‍🌾 Expert
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>FULL NAME *</label>
              <input
                style={{
                  ...styles.input,
                  ...(loading ? styles.inputDisabled : {}),
                }}
                value={form.name}
                onChange={onChange("name")}
                placeholder="Enter your full name"
                disabled={loading}
                onFocus={(e) => (e.target.style.borderColor = '#1e293b')}
                onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>EMAIL *</label>
              <input
                style={{
                  ...styles.input,
                  ...(loading ? styles.inputDisabled : {}),
                }}
                type="email"
                value={form.email}
                onChange={onChange("email")}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
                onFocus={(e) => (e.target.style.borderColor = '#1e293b')}
                onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>PASSWORD *</label>
              <input
                style={{
                  ...styles.input,
                  ...(loading ? styles.inputDisabled : {}),
                }}
                type="password"
                value={form.password}
                onChange={onChange("password")}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={loading}
                onFocus={(e) => (e.target.style.borderColor = '#1e293b')}
                onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
              />
            </div>

            <div style={styles.formRow}>
              <div>
                <label style={styles.label}>PHONE</label>
                <input
                  style={{
                    ...styles.input,
                    ...(loading ? styles.inputDisabled : {}),
                  }}
                  value={form.phone}
                  onChange={onChange("phone")}
                  placeholder="Phone"
                  disabled={loading}
                  onFocus={(e) => (e.target.style.borderColor = '#1e293b')}
                  onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                />
              </div>
              <div>
                <label style={styles.label}>VILLAGE</label>
                <input
                  style={{
                    ...styles.input,
                    ...(loading ? styles.inputDisabled : {}),
                  }}
                  value={form.village}
                  onChange={onChange("village")}
                  placeholder="Village"
                  disabled={loading}
                  onFocus={(e) => (e.target.style.borderColor = '#1e293b')}
                  onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                />
              </div>
            </div>

            <div style={styles.formRow}>
              <div>
                <label style={styles.label}>CITY</label>
                <input
                  style={{
                    ...styles.input,
                    ...(loading ? styles.inputDisabled : {}),
                  }}
                  value={form.city}
                  onChange={onChange("city")}
                  placeholder="City"
                  disabled={loading}
                  onFocus={(e) => (e.target.style.borderColor = '#1e293b')}
                  onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                />
              </div>
              <div>
                <label style={styles.label}>DISTRICT</label>
                <input
                  style={{
                    ...styles.input,
                    ...(loading ? styles.inputDisabled : {}),
                  }}
                  value={form.district}
                  onChange={onChange("district")}
                  placeholder="District"
                  disabled={loading}
                  onFocus={(e) => (e.target.style.borderColor = '#1e293b')}
                  onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                />
              </div>
            </div>

            <div style={styles.formRow}>
              <div>
                <label style={styles.label}>COUNTRY</label>
                <input
                  style={{
                    ...styles.input,
                    ...(loading ? styles.inputDisabled : {}),
                  }}
                  value={form.country}
                  onChange={onChange("country")}
                  placeholder="Country"
                  disabled={loading}
                  onFocus={(e) => (e.target.style.borderColor = '#1e293b')}
                  onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                />
              </div>
              {role === "expert" && (
                <div>
                  <label style={styles.label}>SPECIALIZATION</label>
                  <input
                    style={{
                      ...styles.input,
                      ...(loading ? styles.inputDisabled : {}),
                    }}
                    value={form.specialization}
                    onChange={onChange("specialization")}
                    placeholder="e.g., Soil, Crops"
                    disabled={loading}
                    onFocus={(e) => (e.target.style.borderColor = '#1e293b')}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                  />
                </div>
              )}
            </div>

            {error ? <div style={styles.errorMsg}>{error}</div> : null}
            {successMsg ? <div style={styles.successMsg}>{successMsg}</div> : null}

            <button
              style={{
                ...styles.submitButton,
                ...(loading ? styles.submitButtonDisabled : {}),
              }}
              type="submit"
              disabled={loading}
              onMouseEnter={(e) => !loading && (e.target.style.background = '#334155')}
              onMouseLeave={(e) => (e.target.style.background = '#1e293b')}
            >
              {loading ? "Creating account…" : "Sign Up"}
            </button>

            <div style={styles.footer}>
              Already have an account?{' '}
              <Link to="/login" style={styles.link}>
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;