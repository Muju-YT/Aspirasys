import React, { useState, useEffect } from 'react';
import '../assets/styles/pages/Announcements.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'System Maintenance',
      content: 'The system will undergo maintenance on Saturday, December 10th from 2:00 AM to 4:00 AM.',
      date: '2023-12-05',
      priority: 'high',
      author: 'Admin Team'
    },
    {
      id: 2,
      title: 'New Feature Release',
      content: 'We have released a new dashboard feature with enhanced analytics capabilities.',
      date: '2023-12-03',
      priority: 'medium',
      author: 'Product Team'
    },
    {
      id: 3,
      title: 'Holiday Schedule',
      content: 'Our offices will be closed from December 25th to January 1st for the holiday season.',
      date: '2023-11-28',
      priority: 'low',
      author: 'HR Department'
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium'
  });

  const [isAdding, setIsAdding] = useState(false);

  // Simulate fetching announcements from an API
  useEffect(() => {
    // This would typically be an API call
    console.log('Announcements loaded');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) return;

    const announcement = {
      id: announcements.length + 1,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: new Date().toISOString().split('T')[0],
      priority: newAnnouncement.priority,
      author: 'You'
    };

    setAnnouncements(prev => [announcement, ...prev]);
    setNewAnnouncement({ title: '', content: '', priority: 'medium' });
    setIsAdding(false);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffbb33';
      case 'low': return '#00C851';
      default: return '#ccc';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="announcements-container">
      <header className="announcements-header">
        <h1>Announcements</h1>
        <button 
          className="add-button"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? 'Cancel' : '+ New Announcement'}
        </button>
      </header>

      {isAdding && (
        <div className="add-announcement-form">
          <h2>Create New Announcement</h2>
          <form onSubmit={handleAddAnnouncement}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newAnnouncement.title}
                onChange={handleInputChange}
                placeholder="Enter announcement title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={newAnnouncement.content}
                onChange={handleInputChange}
                placeholder="Enter announcement content"
                rows="4"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={newAnnouncement.priority}
                onChange={handleInputChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <button type="submit" className="submit-button">
              Publish Announcement
            </button>
          </form>
        </div>
      )}

      {announcements.length === 0 ? (
        <div className="no-announcements">
          <p>No announcements available.</p>
        </div>
      ) : (
        <div className="announcements-list">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="announcement-card"
              style={{
                borderLeft: `4px solid ${getPriorityColor(announcement.priority)}`
              }}
            >
              <div className="announcement-header">
                <div className="announcement-title-section">
                  <h3 className="announcement-title">{announcement.title}</h3>
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(announcement.priority) }}
                  >
                    {announcement.priority.toUpperCase()}
                  </span>
                </div>
                <button 
                  className="delete-button"
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                  aria-label="Delete announcement"
                >
                  ×
                </button>
              </div>
              
              <p className="announcement-content">{announcement.content}</p>
              
              <div className="announcement-footer">
                <span className="announcement-date">
                  📅 {formatDate(announcement.date)}
                </span>
                <span className="announcement-author">
                  👤 Posted by: {announcement.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="announcements-footer">
        <p>Total Announcements: {announcements.length}</p>
      </div>
    </div>
  );
};

export default Announcements;