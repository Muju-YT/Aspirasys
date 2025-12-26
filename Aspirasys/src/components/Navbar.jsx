import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/components/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // <-- useNavigate for navigation
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  const pageTitles = {
    '/dashboard': 'Dashboard Overview',
    '/my-courses': 'My Courses',
    '/my-projects': 'My Projects',
    '/my-timesheets': 'My Timesheets',
    '/my-interviews': 'My Interviews',
    '/achievements': 'Achievements',
    '/daily-goals': 'Daily Goals',
    '/announcements': 'Announcements',
    '/my-profile': 'My Profile',
  };

  const currentTitle = pageTitles[location.pathname] || 'Dashboard';

  // Logout handler
  const handleLogout = () => {
    // TODO: clear auth state / token here
    console.log('Logging out...');
    navigate('/login', { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <h1 className="page-title">{currentTitle}</h1>
          <div className="breadcrumb">

          </div>
        </div>

        <div className="navbar-right">
          <button
            className="notification-btn"
            onClick={() => setHasNotifications(false)}
            aria-label="Notifications"
          >
            <span className="notification-icon">🔔</span>
            {hasNotifications && <span className="notification-badge"></span>}
          </button>

          <div className="profile-dropdown">
            <button
              className="profile-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-label="User Profile"
            >
              <div className="profile-avatar">
                <span>JD</span>
              </div>
              <div className="profile-info">
                <span className="profile-name">John Doe</span>
                <span className="profile-role">Senior Developer</span>
              </div>
              <span className={`dropdown-arrow ${isProfileOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isProfileOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">JD</div>
                  <div>
                    <div className="dropdown-name">John Doe</div>
                    <div className="dropdown-email">john.doe@aspirasys.com</div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>

                {/* Navigation buttons */}
                <button
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/dashboard/my-profile');
                    setIsProfileOpen(false);
                  }}
                >
                  <span>👤</span> My Profile
                </button>

                <button
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/dashboard/settings');
                    setIsProfileOpen(false);
                  }}
                >
                  <span>⚙️</span> Settings
                </button>

                <button
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/dashboard/security');
                    setIsProfileOpen(false);
                  }}
                >
                  <span>🛡️</span> Security
                </button>


                <div className="dropdown-divider"></div>

                {/* Logout button */}
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <span>🚪</span> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
