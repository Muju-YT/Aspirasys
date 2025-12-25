import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardTitle, CardDescription, CardFooter } from '../components/Card';
import '../assets/styles/pages/Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    username: 'john_doe',
    email: 'john.doe@aspirasys.com',
    theme: 'light',
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      weeklyDigest: true,
      projectUpdates: true,
      courseUpdates: true,
    },
    privacy: {
      profileVisibility: 'team',
      showOnlineStatus: true,
      allowMessages: 'team',
    },
    preferences: {
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      language: 'en-US',
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleInputChange = (section, field, value) => {
    if (section === 'notifications' || section === 'privacy' || section === 'preferences') {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus(null);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
      
      console.log('Settings saved:', settings);
    }, 1500);
  };

  const handleReset = () => {
    setSettings({
      username: 'john_doe',
      email: 'john.doe@aspirasys.com',
      theme: 'light',
      notifications: {
        emailNotifications: true,
        smsNotifications: false,
        weeklyDigest: true,
        projectUpdates: true,
        courseUpdates: true,
      },
      privacy: {
        profileVisibility: 'team',
        showOnlineStatus: true,
        allowMessages: 'team',
      },
      preferences: {
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        language: 'en-US',
      }
    });
    setSaveStatus(null);
  };

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'ja-JP', name: 'Japanese' },
  ];

  return (
    <div className="settings-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Account Settings</h1>
          <p className="page-subtitle">Manage your account preferences and privacy settings</p>
        </div>
        {saveStatus === 'success' && (
          <div className="save-success-message">
            <span className="success-icon">✅</span>
            Settings saved successfully!
          </div>
        )}
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            <button className="nav-item active">
              <span className="nav-icon">👤</span>
              <span className="nav-label">Account</span>
            </button>
            <button className="nav-item">
              <span className="nav-icon">🔔</span>
              <span className="nav-label">Notifications</span>
            </button>
            <button className="nav-item">
              <span className="nav-icon">🛡️</span>
              <span className="nav-label">Security</span>
            </button>
            <button className="nav-item">
              <span className="nav-icon">🌐</span>
              <span className="nav-label">Preferences</span>
            </button>
            <button className="nav-item">
              <span className="nav-icon">📧</span>
              <span className="nav-label">Integrations</span>
            </button>
            <button className="nav-item">
              <span className="nav-icon">💼</span>
              <span className="nav-label">Billing</span>
            </button>
          </nav>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <Card className="account-card">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your basic account details</CardDescription>
              </CardHeader>
              <CardBody>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">👤</span>
                      Username
                    </label>
                    <input
                      type="text"
                      value={settings.username}
                      onChange={(e) => handleInputChange('basic', 'username', e.target.value)}
                      className="form-input"
                      placeholder="Enter your username"
                    />
                    <div className="form-hint">
                      This will be displayed on your profile
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">📧</span>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleInputChange('basic', 'email', e.target.value)}
                      className="form-input"
                      placeholder="Enter your email"
                    />
                    <div className="form-hint">
                      We'll send account notifications to this email
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">🎨</span>
                      Theme Preference
                    </label>
                    <div className="theme-options">
                      <label className="theme-option">
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={settings.theme === 'light'}
                          onChange={(e) => handleInputChange('basic', 'theme', e.target.value)}
                          className="theme-radio"
                        />
                        <div className="theme-preview light-theme">
                          <div className="theme-icon">☀️</div>
                          <div className="theme-name">Light</div>
                        </div>
                      </label>
                      
                      <label className="theme-option">
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={settings.theme === 'dark'}
                          onChange={(e) => handleInputChange('basic', 'theme', e.target.value)}
                          className="theme-radio"
                        />
                        <div className="theme-preview dark-theme">
                          <div className="theme-icon">🌙</div>
                          <div className="theme-name">Dark</div>
                        </div>
                      </label>
                      
                      <label className="theme-option">
                        <input
                          type="radio"
                          name="theme"
                          value="auto"
                          checked={settings.theme === 'auto'}
                          onChange={(e) => handleInputChange('basic', 'theme', e.target.value)}
                          className="theme-radio"
                        />
                        <div className="theme-preview auto-theme">
                          <div className="theme-icon">⚙️</div>
                          <div className="theme-name">Auto</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="settings-grid">
            <div className="settings-column">
              <Card className="notifications-card">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Choose what notifications you receive</CardDescription>
                </CardHeader>
                <CardBody>
                  <div className="notifications-list">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <div key={key} className="notification-item">
                        <div className="notification-info">
                          <div className="notification-title">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className="notification-description">
                            {key === 'emailNotifications' && 'Receive email notifications'}
                            {key === 'smsNotifications' && 'Receive SMS notifications'}
                            {key === 'weeklyDigest' && 'Weekly summary of your activity'}
                            {key === 'projectUpdates' && 'Updates from your projects'}
                            {key === 'courseUpdates' && 'Updates from your courses'}
                          </div>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                            className="toggle-input"
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="settings-column">
              <Card className="privacy-card">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your privacy and visibility</CardDescription>
                </CardHeader>
                <CardBody>
                  <div className="privacy-settings">
                    <div className="privacy-item">
                      <label className="privacy-label">
                        <span className="privacy-icon">👁️</span>
                        Profile Visibility
                      </label>
                      <select
                        value={settings.privacy.profileVisibility}
                        onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
                        className="privacy-select"
                      >
                        <option value="public">Everyone</option>
                        <option value="team">Team Members Only</option>
                        <option value="private">Only Me</option>
                      </select>
                    </div>

                    <div className="privacy-item">
                      <label className="privacy-label">
                        <span className="privacy-icon">🟢</span>
                        Show Online Status
                      </label>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={settings.privacy.showOnlineStatus}
                          onChange={(e) => handleInputChange('privacy', 'showOnlineStatus', e.target.checked)}
                          className="toggle-input"
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="privacy-item">
                      <label className="privacy-label">
                        <span className="privacy-icon">💬</span>
                        Allow Messages From
                      </label>
                      <select
                        value={settings.privacy.allowMessages}
                        onChange={(e) => handleInputChange('privacy', 'allowMessages', e.target.value)}
                        className="privacy-select"
                      >
                        <option value="team">Team Members Only</option>
                        <option value="company">Anyone in Company</option>
                        <option value="none">No One</option>
                      </select>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="preferences-card">
                <CardHeader>
                  <CardTitle>Regional Preferences</CardTitle>
                  <CardDescription>Set your local preferences</CardDescription>
                </CardHeader>
                <CardBody>
                  <div className="preferences-list">
                    <div className="preference-item">
                      <label className="preference-label">
                        <span className="preference-icon">🌍</span>
                        Timezone
                      </label>
                      <select
                        value={settings.preferences.timezone}
                        onChange={(e) => handleInputChange('preferences', 'timezone', e.target.value)}
                        className="preference-select"
                      >
                        {timezones.map(tz => (
                          <option key={tz} value={tz}>{tz}</option>
                        ))}
                      </select>
                    </div>

                    <div className="preference-item">
                      <label className="preference-label">
                        <span className="preference-icon">📅</span>
                        Date Format
                      </label>
                      <select
                        value={settings.preferences.dateFormat}
                        onChange={(e) => handleInputChange('preferences', 'dateFormat', e.target.value)}
                        className="preference-select"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div className="preference-item">
                      <label className="preference-label">
                        <span className="preference-icon">🗣️</span>
                        Language
                      </label>
                      <select
                        value={settings.preferences.language}
                        onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                        className="preference-select"
                      >
                        {languages.map(lang => (
                          <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="settings-actions">
            <Card className="actions-card">
              <CardBody>
                <div className="actions-content">
                  <div className="actions-info">
                    <div className="actions-icon">💾</div>
                    <div>
                      <div className="actions-title">Save Your Changes</div>
                      <div className="actions-description">
                        Your settings will be applied across all devices
                      </div>
                    </div>
                  </div>
                  <div className="actions-buttons">
                    <button
                      className="reset-btn"
                      onClick={handleReset}
                      disabled={isLoading}
                    >
                      Reset to Default
                    </button>
                    <button
                      className="save-btn"
                      onClick={handleSave}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner"></span>
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;