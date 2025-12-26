import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/styles/pages/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: '🚀',
      title: 'Accelerate Growth',
      description: 'Unlock your potential with personalized learning paths',
      color: '#6366F1',
      gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
    },
    {
      icon: '🌟',
      title: 'Master Skills',
      description: 'Access cutting-edge courses from industry experts',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981, #34D399)'
    },
    {
      icon: '🤝',
      title: 'Connect & Collaborate',
      description: 'Join a vibrant community of professionals',
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)'
    },
    {
      icon: '📈',
      title: 'Track Progress',
      description: 'Visualize your journey with detailed analytics',
      color: '#EC4899',
      gradient: 'linear-gradient(135deg, #EC4899, #F472B6)'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Add colorful loading effect
    setTimeout(() => {
      setIsLoading(false);

      // For demo purposes, accept any email/password
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.email.split('@')[0]);

      // Add success animation before navigation
      const btn = document.querySelector('.login-btn-gradient');
      if (btn) {
        btn.classList.add('success');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        navigate('/dashboard');
      }
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleForgotPassword = () => {
    const notification = document.createElement('div');
    notification.className = 'colorful-notification';
    notification.innerHTML = `
      <div class="notification-icon">✨</div>
      <div class="notification-content">
        <div class="notification-title">Password Reset Sent!</div>
        <div class="notification-text">Check your email for the reset link</div>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }, 100);
  };

  const handleSSOLogin = (provider) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      localStorage.setItem('userName', `${provider} User`);

      const btn = document.querySelector(`.gradient-${provider}`);
      if (btn) {
        btn.classList.add('success');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);

      } else {
        navigate('/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="login-page">
      {/* Animated background */}
      <div className="animated-background">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-orb"
            style={{
              '--delay': `${i * 0.5}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--color': `hsl(${Math.random() * 360}, 80%, 60%)`,
              '--size': `${30 + Math.random() * 50}px`
            }}
          />
        ))}
        <div className="gradient-wave"></div>
      </div>

      {/* Decorative elements */}
      <div className="decorative-shapes">
        <div className="shape shape-triangle" style={{ '--color': '#6366F1' }}></div>
        <div className="shape shape-circle" style={{ '--color': '#10B981' }}></div>
        <div className="shape shape-square" style={{ '--color': '#F59E0B' }}></div>
        <div className="shape shape-hexagon" style={{ '--color': '#EC4899' }}></div>
      </div>

      <div className="login-container">
        {/* Left Panel */}
        <div className="login-left">
          <div className="brand-section">
            <div className="brand-logo-animated">
              <div className="logo-orb">
                <span className="logo-letter">A</span>
                <div className="logo-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                </div>
              </div>
              <div className="brand-text-container">
                <h1 className="brand-title">
                  <span className="title-gradient">Aspirasys</span>
                  <div className="title-underline"></div>
                </h1>
                <p className="brand-subtitle">Elevate Your Career Journey</p>
              </div>
            </div>

            <div className="tagline-container">
              <h2 className="tagline">
                Where <span className="tagline-highlight">ambition</span> meets{' '}
                <span className="tagline-highlight">opportunity</span>
              </h2>
              <p className="tagline-description">
                Join thousands of professionals accelerating their careers with our
                immersive learning platform. Transform your potential into achievement.
              </p>
            </div>
          </div>

          {/* Feature Carousel */}
          <div className="feature-carousel">
            <div
              className="feature-display"
              style={{ background: features[activeFeature].gradient }}
            >
              <div className="feature-icon-large">{features[activeFeature].icon}</div>
              <div className="feature-content">
                <h3 className="feature-title">{features[activeFeature].title}</h3>
                <p className="feature-description">{features[activeFeature].description}</p>
              </div>
              <div className="feature-glow"></div>
            </div>

            <div className="feature-indicators">
              {features.map((feature, index) => (
                <button
                  key={index}
                  className={`feature-indicator ${index === activeFeature ? 'active' : ''}`}
                  onClick={() => setActiveFeature(index)}
                  style={{ '--indicator-color': feature.color }}
                  aria-label={`View feature: ${feature.title}`}
                >
                  <span className="indicator-dot"></span>
                  <span className="indicator-title">{feature.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card" style={{ '--card-color': '#6366F1' }}>
              <div className="stat-icon-wrapper">
                <span className="stat-icon">👥</span>
                <div className="stat-sparkle">✨</div>
              </div>
              <div className="stat-content">
                <div className="stat-number animate-count" data-count="5000">0</div>
                <div className="stat-label">Active Learners</div>
              </div>
            </div>

            <div className="stat-card" style={{ '--card-color': '#10B981' }}>
              <div className="stat-icon-wrapper">
                <span className="stat-icon">📚</span>
                <div className="stat-sparkle">🌟</div>
              </div>
              <div className="stat-content">
                <div className="stat-number animate-count" data-count="200">0</div>
                <div className="stat-label">Premium Courses</div>
              </div>
            </div>

            <div className="stat-card" style={{ '--card-color': '#F59E0B' }}>
              <div className="stat-icon-wrapper">
                <span className="stat-icon">🎯</span>
                <div className="stat-sparkle">⚡</div>
              </div>
              <div className="stat-content">
                <div className="stat-number animate-count" data-count="98">0</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="login-right">
          <div className="login-card">
            {/* Card Header */}
            <div className="card-header">
              <div className="welcome-section">
                <div className="welcome-icon animate-bounce">👋</div>
                <div className="welcome-text">
                  <h2 className="welcome-title">Welcome Back!</h2>
                  <p className="welcome-subtitle">Ready to continue your journey?</p>
                </div>
              </div>
              <div className="header-glow"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <span className="label-icon animate-pulse">📧</span>
                  <span className="label-text">Email Address</span>
                </label>
                <div className="input-container">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="you@company.com"
                    disabled={isLoading}
                  />
                  <div className="input-decoration"></div>
                  {formData.email && (
                    <button
                      type="button"
                      className="clear-btn"
                      onClick={() => setFormData(prev => ({ ...prev, email: '' }))}
                      aria-label="Clear email"
                    >
                      ×
                    </button>
                  )}
                </div>
                {errors.email && (
                  <div className="error-message animate-shake">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <div className="password-header">
                  <label htmlFor="password" className="form-label">
                    <span className="label-icon animate-pulse">🔑</span>
                    <span className="label-text">Password</span>
                  </label>
                  <button
                    type="button"
                    className="forgot-password-btn"
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                  >
                    <span className="forgot-icon">🔓</span>
                    <span className="forgot-text">Forgot Password?</span>
                  </button>
                </div>
                <div className="input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <div className="input-decoration"></div>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && (
                  <div className="error-message animate-shake">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{errors.password}</span>
                  </div>
                )}
                <div className="password-strength">
                  <div
                    className="strength-bar"
                    style={{
                      width: `${Math.min(formData.password.length * 10, 100)}%`,
                      background: `linear-gradient(90deg, 
                        ${formData.password.length >= 8 ? '#10B981' :
                          formData.password.length >= 6 ? '#F59E0B' : '#EF4444'}, 
                        ${formData.password.length >= 8 ? '#34D399' :
                          formData.password.length >= 6 ? '#FBBF24' : '#DC2626'})`
                    }}
                  ></div>
                </div>
              </div>

              {/* Remember Me */}
              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="checkbox-input"
                    disabled={isLoading}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">Remember me for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="login-btn-gradient"
                disabled={isLoading}
              >
                <span className="btn-content">
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      <span className="btn-text">Accessing Platform...</span>
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">🚀</span>
                      <span className="btn-text">Launch Dashboard</span>
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </span>
                <div className="btn-glow"></div>
              </button>

              {/* Divider */}
              <div className="divider">
                <div className="divider-line"></div>
                <span className="divider-text">Or continue with</span>
                <div className="divider-line"></div>
              </div>

              {/* SSO Buttons */}
              <div className="sso-buttons">
                <button
                  type="button"
                  className="sso-btn google"
                  onClick={() => handleSSOLogin('google')}
                  disabled={isLoading}
                >
                  <span className="sso-icon-wrapper">
                    <span className="sso-icon">G</span>
                  </span>
                  <span className="sso-text">Google</span>
                </button>

                <button
                  type="button"
                  className="sso-btn microsoft"
                  onClick={() => handleSSOLogin('microsoft')}
                  disabled={isLoading}
                >
                  <span className="sso-icon-wrapper">
                    <span className="sso-icon">M</span>
                  </span>
                  <span className="sso-text">Microsoft</span>
                </button>

                <button
                  type="button"
                  className="sso-btn linkedin"
                  onClick={() => handleSSOLogin('linkedin')}
                  disabled={isLoading}
                >
                  <span className="sso-icon-wrapper">
                    <span className="sso-icon">in</span>
                  </span>
                  <span className="sso-text">LinkedIn</span>
                </button>
              </div>

              {/* Footer */}
              <div className="form-footer">
                <p className="signup-prompt">
                  New to Aspirasys?{' '}
                  <Link to="/register" className="signup-link">
                    <span className="signup-icon">✨</span>
                    <span className="signup-text">Request Access</span>
                  </Link>
                </p>

                <div className="support-section">
                  <div className="support-icon">💬</div>
                  <div className="support-content">
                    <div className="support-title">Need assistance?</div>
                    <a href="mailto:support@aspirasys.com" className="support-link">
                      support@aspirasys.com
                    </a>
                  </div>
                </div>
              </div>
            </form>

            {/* Security Badges */}
            <div className="security-badges">
              <div className="security-header">
                <span className="security-icon">🛡️</span>
                <span className="security-title">Enterprise Security</span>
              </div>
              <div className="badges-grid">
                <div className="badge">
                  <span className="badge-icon">🔐</span>
                  <span className="badge-text">GDPR Compliant</span>
                </div>
                <div className="badge">
                  <span className="badge-icon">🛡️</span>
                  <span className="badge-text">SOC 2 Type II</span>
                </div>
                <div className="badge">
                  <span className="badge-icon">✅</span>
                  <span className="badge-text">ISO 27001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              '--delay': `${i * 0.3}s`,
              '--duration': `${2 + Math.random() * 2}s`,
              '--color': `hsl(${Math.random() * 360}, 80%, 65%)`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Login;