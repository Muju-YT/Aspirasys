import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../assets/styles/components/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: 'my-courses', icon: '📚', label: 'My Courses' },
    { path: 'my-projects', icon: '🚀', label: 'My Projects' },
    { path: 'my-timesheets', icon: '⏱️', label: 'My Timesheets' },
    { path: 'my-interviews', icon: '💼', label: 'My Interviews' },
    { path: 'achievements', icon: '🏆', label: 'Achievements' },
    { path: 'daily-goals', icon: '🎯', label: 'Daily Goals' },
    { path: 'announcements', icon: '📢', label: 'Announcements' },
    { path: 'my-profile', icon: '👤', label: 'My Profile' },
  ];


  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">A</span>
          <span className="logo-text">TIET M Aspirasys</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            <span>JD</span>
          </div>
          <div className="user-details">
            <p className="user-name">John Doe</p>
            <p className="user-role">Senior Developer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;