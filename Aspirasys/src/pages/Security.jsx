import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardTitle, CardDescription, CardFooter } from '../components/Card';
import '../assets/styles/pages/Security.css';

const Security = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorAuth, setTwoFactorAuth] = useState({
    enabled: true,
    method: 'authenticator',
    backupCodes: ['123456', '234567', '345678', '456789', '567890'],
    lastUsed: '2024-12-10'
  });

  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'San Francisco, CA',
      ip: '192.168.1.100',
      lastActive: 'Just now',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'San Francisco, CA',
      ip: '192.168.1.101',
      lastActive: '2 hours ago',
      current: false
    },
    {
      id: 3,
      device: 'Firefox on Mac',
      location: 'New York, NY',
      ip: '203.0.113.50',
      lastActive: '1 week ago',
      current: false
    }
  ]);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const validatePassword = (password) => {
    let strength = 0;
    const requirements = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    Object.values(requirements).forEach(req => {
      if (req) strength += 20;
    });

    return {
      strength,
      requirements
    };
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Check password strength
    if (name === 'newPassword') {
      const { strength } = validatePassword(value);
      setPasswordStrength(strength);
    }

    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!passwordForm.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordForm.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else {
      const { requirements } = validatePassword(passwordForm.newPassword);
      if (!requirements.length) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }
    }

    if (!passwordForm.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Password updated successfully!');

      // Reset form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordStrength(0);
      setShowPassword({ current: false, new: false, confirm: false });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }, 1500);
  };

  const handleToggle2FA = () => {
    const newState = !twoFactorAuth.enabled;
    setTwoFactorAuth(prev => ({ ...prev, enabled: newState }));
    
    setSuccessMessage(`Two-factor authentication ${newState ? 'enabled' : 'disabled'}!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleRevokeSession = (sessionId) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    setSuccessMessage('Session revoked successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleRevokeAllSessions = () => {
    setSessions(prev => prev.filter(session => session.current));
    setSuccessMessage('All other sessions revoked!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return 'var(--danger-color)';
    if (passwordStrength < 80) return 'var(--warning-color)';
    return 'var(--success-color)';
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return 'No password';
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 60) return 'Fair';
    if (passwordStrength < 80) return 'Good';
    return 'Strong';
  };

  const generateBackupCodes = () => {
    const newCodes = Array.from({ length: 5 }, () => 
      Math.floor(100000 + Math.random() * 900000).toString()
    );
    setTwoFactorAuth(prev => ({ ...prev, backupCodes: newCodes }));
    setSuccessMessage('New backup codes generated!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="security-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Security Settings</h1>
          <p className="page-subtitle">Manage your account security and authentication</p>
        </div>
        {successMessage && (
          <div className="security-success-message">
            <span className="success-icon">✅</span>
            {successMessage}
          </div>
        )}
      </div>

      <div className="security-container">
        <div className="security-grid">
          <div className="security-column">
            <Card className="password-card">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardBody>
                <form onSubmit={handlePasswordUpdate} className="password-form">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">🔐</span>
                      Current Password
                    </label>
                    <div className="password-input-group">
                      <input
                        type={showPassword.current ? 'text' : 'password'}
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className={`form-input ${errors.currentPassword ? 'error' : ''}`}
                        placeholder="Enter current password"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility('current')}
                        disabled={isLoading}
                      >
                        {showPassword.current ? '👁️‍🗨️' : '👁️'}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <div className="error-message">
                        <span className="error-icon">⚠️</span> {errors.currentPassword}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">🔄</span>
                      New Password
                    </label>
                    <div className="password-input-group">
                      <input
                        type={showPassword.new ? 'text' : 'password'}
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className={`form-input ${errors.newPassword ? 'error' : ''}`}
                        placeholder="Enter new password"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility('new')}
                        disabled={isLoading}
                      >
                        {showPassword.new ? '👁️‍🗨️' : '👁️'}
                      </button>
                    </div>
                    
                    {passwordForm.newPassword && (
                      <div className="password-strength-meter">
                        <div className="strength-header">
                          <span className="strength-label">Password Strength:</span>
                          <span 
                            className="strength-value"
                            style={{ color: getPasswordStrengthColor() }}
                          >
                            {getPasswordStrengthLabel()}
                          </span>
                        </div>
                        <div className="strength-bar">
                          <div 
                            className="strength-fill"
                            style={{ 
                              width: `${passwordStrength}%`,
                              backgroundColor: getPasswordStrengthColor()
                            }}
                          ></div>
                        </div>
                        <div className="password-requirements">
                          <div className={`requirement ${passwordForm.newPassword.length >= 8 ? 'met' : ''}`}>
                            <span className="requirement-icon">
                              {passwordForm.newPassword.length >= 8 ? '✅' : '⚪'}
                            </span>
                            <span className="requirement-text">At least 8 characters</span>
                          </div>
                          <div className={`requirement ${/[a-z]/.test(passwordForm.newPassword) ? 'met' : ''}`}>
                            <span className="requirement-icon">
                              {/[a-z]/.test(passwordForm.newPassword) ? '✅' : '⚪'}
                            </span>
                            <span className="requirement-text">Lowercase letter</span>
                          </div>
                          <div className={`requirement ${/[A-Z]/.test(passwordForm.newPassword) ? 'met' : ''}`}>
                            <span className="requirement-icon">
                              {/[A-Z]/.test(passwordForm.newPassword) ? '✅' : '⚪'}
                            </span>
                            <span className="requirement-text">Uppercase letter</span>
                          </div>
                          <div className={`requirement ${/\d/.test(passwordForm.newPassword) ? 'met' : ''}`}>
                            <span className="requirement-icon">
                              {/\d/.test(passwordForm.newPassword) ? '✅' : '⚪'}
                            </span>
                            <span className="requirement-text">Number</span>
                          </div>
                          <div className={`requirement ${/[!@#$%^&*(),.?":{}|<>]/.test(passwordForm.newPassword) ? 'met' : ''}`}>
                            <span className="requirement-icon">
                              {/[!@#$%^&*(),.?":{}|<>]/.test(passwordForm.newPassword) ? '✅' : '⚪'}
                            </span>
                            <span className="requirement-text">Special character</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {errors.newPassword && (
                      <div className="error-message">
                        <span className="error-icon">⚠️</span> {errors.newPassword}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">✓</span>
                      Confirm New Password
                    </label>
                    <div className="password-input-group">
                      <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                        placeholder="Confirm new password"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility('confirm')}
                        disabled={isLoading}
                      >
                        {showPassword.confirm ? '👁️‍🗨️' : '👁️'}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="error-message">
                        <span className="error-icon">⚠️</span> {errors.confirmPassword}
                      </div>
                    )}
                    
                    {passwordForm.newPassword && passwordForm.confirmPassword && 
                     passwordForm.newPassword === passwordForm.confirmPassword && (
                      <div className="password-match-success">
                        <span className="match-icon">✅</span>
                        Passwords match
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="update-btn"
                    disabled={isLoading || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner"></span>
                        Updating Password...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </button>
                </form>
              </CardBody>
            </Card>

            <Card className="sessions-card">
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your active login sessions</CardDescription>
              </CardHeader>
              <CardBody>
                <div className="sessions-list">
                  {sessions.map(session => (
                    <div key={session.id} className={`session-item ${session.current ? 'current' : ''}`}>
                      <div className="session-info">
                        <div className="session-header">
                          <div className="session-device">
                            <span className="device-icon">
                              {session.device.includes('Chrome') ? '🌐' : 
                               session.device.includes('Safari') ? '🍎' : 
                               session.device.includes('Firefox') ? '🦊' : '💻'}
                            </span>
                            <div>
                              <div className="device-name">{session.device}</div>
                              <div className="session-meta">
                                <span className="session-location">{session.location}</span>
                                <span className="session-ip">IP: {session.ip}</span>
                              </div>
                            </div>
                          </div>
                          {session.current && (
                            <span className="current-badge">Current</span>
                          )}
                        </div>
                        <div className="session-footer">
                          <span className="session-time">Last active: {session.lastActive}</span>
                          {!session.current && (
                            <button
                              className="revoke-btn"
                              onClick={() => handleRevokeSession(session.id)}
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {sessions.length > 1 && (
                  <button
                    className="revoke-all-btn"
                    onClick={handleRevokeAllSessions}
                  >
                    Revoke All Other Sessions
                  </button>
                )}
              </CardBody>
            </Card>
          </div>

          <div className="security-column">
            <Card className="two-factor-card">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardBody>
                <div className="two-factor-content">
                  <div className="two-factor-header">
                    <div className="two-factor-status">
                      <div className={`status-indicator ${twoFactorAuth.enabled ? 'enabled' : 'disabled'}`}>
                        {twoFactorAuth.enabled ? '🟢' : '⚪'}
                      </div>
                      <div>
                        <div className="status-text">
                          {twoFactorAuth.enabled ? 'Enabled' : 'Disabled'}
                        </div>
                        <div className="status-description">
                          {twoFactorAuth.enabled 
                            ? 'Your account is protected with 2FA'
                            : 'Enable 2FA for added security'
                          }
                        </div>
                      </div>
                    </div>
                    <label className="toggle-switch large">
                      <input
                        type="checkbox"
                        checked={twoFactorAuth.enabled}
                        onChange={handleToggle2FA}
                        className="toggle-input"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  {twoFactorAuth.enabled && (
                    <>
                      <div className="two-factor-method">
                        <label className="method-label">Authentication Method</label>
                        <div className="method-options">
                          <label className="method-option">
                            <input
                              type="radio"
                              name="2fa-method"
                              value="authenticator"
                              checked={twoFactorAuth.method === 'authenticator'}
                              onChange={(e) => setTwoFactorAuth(prev => ({ ...prev, method: e.target.value }))}
                              className="method-radio"
                            />
                            <div className="method-preview">
                              <div className="method-icon">📱</div>
                              <div className="method-name">Authenticator App</div>
                            </div>
                          </label>
                          
                          <label className="method-option">
                            <input
                              type="radio"
                              name="2fa-method"
                              value="sms"
                              checked={twoFactorAuth.method === 'sms'}
                              onChange={(e) => setTwoFactorAuth(prev => ({ ...prev, method: e.target.value }))}
                              className="method-radio"
                              disabled
                            />
                            <div className="method-preview disabled">
                              <div className="method-icon">📲</div>
                              <div className="method-name">SMS</div>
                              <span className="coming-soon">Coming Soon</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="backup-codes">
                        <div className="backup-header">
                          <div className="backup-title">
                            <span className="backup-icon">🔑</span>
                            Backup Codes
                          </div>
                          <button
                            className="generate-codes-btn"
                            onClick={generateBackupCodes}
                          >
                            Generate New Codes
                          </button>
                        </div>
                        <div className="backup-info">
                          Save these codes in a secure place. Each code can be used once.
                        </div>
                        <div className="codes-grid">
                          {twoFactorAuth.backupCodes.map((code, index) => (
                            <div key={index} className="code-item">
                              <span className="code-number">{code}</span>
                              <button className="copy-code-btn" onClick={() => {
                                navigator.clipboard.writeText(code);
                                setSuccessMessage('Code copied to clipboard!');
                                setTimeout(() => setSuccessMessage(''), 2000);
                              }}>
                                📋
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardBody>
            </Card>

            <Card className="security-log-card">
              <CardHeader>
                <CardTitle>Security Log</CardTitle>
                <CardDescription>Recent security activities on your account</CardDescription>
              </CardHeader>
              <CardBody>
                <div className="security-log">
                  <div className="log-item">
                    <div className="log-icon">🔐</div>
                    <div className="log-content">
                      <div className="log-text">Password changed successfully</div>
                      <div className="log-time">Today, 10:30 AM</div>
                    </div>
                  </div>
                  <div className="log-item">
                    <div className="log-icon">📱</div>
                    <div className="log-content">
                      <div className="log-text">2FA authentication successful</div>
                      <div className="log-time">Yesterday, 2:15 PM</div>
                    </div>
                  </div>
                  <div className="log-item">
                    <div className="log-icon">💻</div>
                    <div className="log-content">
                      <div className="log-text">New login from Chrome on Windows</div>
                      <div className="log-time">Dec 12, 2024, 9:45 AM</div>
                    </div>
                  </div>
                  <div className="log-item">
                    <div className="log-icon">🚫</div>
                    <div className="log-content">
                      <div className="log-text">Failed login attempt blocked</div>
                      <div className="log-time">Dec 10, 2024, 11:30 PM</div>
                    </div>
                  </div>
                </div>
                <button className="view-all-logs-btn">
                  View All Security Logs
                </button>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="security-tips">
          <Card className="tips-card">
            <CardHeader>
              <CardTitle>Security Tips</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="tips-list">
                <div className="tip-item">
                  <div className="tip-icon">🔑</div>
                  <div className="tip-content">
                    <div className="tip-title">Use Strong Passwords</div>
                    <div className="tip-description">Create passwords with at least 12 characters including numbers, symbols, and mixed case letters.</div>
                  </div>
                </div>
                <div className="tip-item">
                  <div className="tip-icon">📱</div>
                  <div className="tip-content">
                    <div className="tip-title">Enable Two-Factor Authentication</div>
                    <div className="tip-description">Add an extra layer of security by requiring a second form of verification.</div>
                  </div>
                </div>
                <div className="tip-item">
                  <div className="tip-icon">👁️</div>
                  <div className="tip-content">
                    <div className="tip-title">Monitor Active Sessions</div>
                    <div className="tip-description">Regularly check and revoke unfamiliar login sessions.</div>
                  </div>
                </div>
                <div className="tip-item">
                  <div className="tip-icon">🔄</div>
                  <div className="tip-content">
                    <div className="tip-title">Update Regularly</div>
                    <div className="tip-description">Change your password every 90 days and avoid reusing old passwords.</div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Security;