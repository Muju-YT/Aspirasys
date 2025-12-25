import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardTitle, CardDescription, CardFooter } from '../components/Card';
import '../assets/styles/pages/MyInterviews.css';

const MyInterviews = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const interviews = [
    {
      id: 1,
      position: 'Senior Frontend Engineer',
      company: 'Aspirasys',
      type: 'Internal Promotion',
      date: '2024-12-20',
      time: '10:00 AM',
      duration: '60 mins',
      interviewers: ['Sarah Wilson', 'Michael Chen', 'Alex Johnson'],
      status: 'Upcoming',
      stage: 'Technical Round',
      location: 'Conference Room B / Zoom',
      preparation: 'React advanced concepts, System design, Behavioral questions',
      notes: 'Bring portfolio and previous project case studies'
    },
    {
      id: 2,
      position: 'Tech Lead',
      company: 'InnovateCorp',
      type: 'External',
      date: '2024-12-15',
      time: '2:30 PM',
      duration: '90 mins',
      interviewers: ['David Lee (CTO)', 'Emma Rodriguez'],
      status: 'Scheduled',
      stage: 'Final Round',
      location: 'Zoom Meeting',
      preparation: 'Leadership experience, Team management, Technical strategy',
      notes: 'Review company values and recent projects'
    },
    {
      id: 3,
      position: 'Full Stack Developer',
      company: 'CloudSystems',
      type: 'External',
      date: '2024-12-10',
      time: '11:00 AM',
      duration: '45 mins',
      interviewers: ['Robert Kim'],
      status: 'Completed',
      stage: 'HR Screening',
      location: 'Phone Call',
      result: 'Advanced to next round',
      feedback: 'Positive initial impression, strong communication skills'
    },
    {
      id: 4,
      position: 'UI/UX Developer',
      company: 'DesignFirst',
      type: 'External',
      date: '2024-12-05',
      time: '3:00 PM',
      duration: '75 mins',
      interviewers: ['Lisa Wang', 'Tom Harris'],
      status: 'Completed',
      stage: 'Technical Round',
      location: 'On-site',
      result: 'Rejected',
      feedback: 'Strong technical skills but lacking in UX design experience'
    },
    {
      id: 5,
      position: 'Backend Engineer',
      company: 'DataFlow Inc.',
      type: 'External',
      date: '2024-12-25',
      time: '1:00 PM',
      duration: '60 mins',
      interviewers: ['John Smith', 'Maria Garcia'],
      status: 'Upcoming',
      stage: 'Initial Screening',
      location: 'Zoom Meeting',
      preparation: 'System design, Database optimization, API design'
    },
  ];

  const stats = {
    total: interviews.length,
    upcoming: interviews.filter(i => i.status === 'Upcoming').length,
    completed: interviews.filter(i => i.status === 'Completed').length,
    scheduled: interviews.filter(i => i.status === 'Scheduled').length,
  };

  const filteredInterviews = activeFilter === 'all' 
    ? interviews 
    : interviews.filter(i => i.status.toLowerCase() === activeFilter.toLowerCase());

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming': return 'var(--warning-color)';
      case 'Scheduled': return 'var(--primary-color)';
      case 'Completed': return 'var(--success-color)';
      case 'Rejected': return 'var(--danger-color)';
      default: return 'var(--text-tertiary)';
    }
  };

  const getStageColor = (stage) => {
    const stageColors = {
      'HR Screening': '#3b82f6',
      'Technical Round': '#10b981',
      'Final Round': '#8b5cf6',
      'Manager Round': '#f59e0b',
      'Internal Promotion': '#6366f1',
    };
    return stageColors[stage] || 'var(--text-tertiary)';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="my-interviews">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>My Interviews</h1>
            <p className="page-subtitle">Track and manage your interview schedule</p>
          </div>
          <div className="header-actions">
            <button className="primary-btn">
              + Schedule Interview
            </button>
          </div>
        </div>
      </div>

      <div className="interviews-stats">
        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon total">📅</div>
              <div className="stat-info">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Interviews</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon upcoming">⏰</div>
              <div className="stat-info">
                <div className="stat-number">{stats.upcoming}</div>
                <div className="stat-label">Upcoming</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon scheduled">✅</div>
              <div className="stat-info">
                <div className="stat-number">{stats.scheduled}</div>
                <div className="stat-label">Scheduled</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon completed">🏆</div>
              <div className="stat-info">
                <div className="stat-number">{stats.completed}</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="interviews-controls">
        <div className="filter-tabs">
          {['all', 'upcoming', 'scheduled', 'completed'].map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'all' ? 'All Interviews' : 
               filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="view-controls">
          <button className="view-btn active">📅 Calendar View</button>
          <button className="view-btn">📋 List View</button>
        </div>
      </div>

      <div className="interviews-container">
        <div className="calendar-section">
          <Card className="calendar-card">
            <CardHeader>
              <CardTitle>Interview Calendar</CardTitle>
              <CardDescription>December 2024</CardDescription>
            </CardHeader>
            <CardBody>
              <div className="calendar-view">
                <div className="calendar-header">
                  <button className="nav-btn">←</button>
                  <div className="calendar-month">December 2024</div>
                  <button className="nav-btn">→</button>
                </div>
                <div className="calendar-grid">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="calendar-day-header">{day}</div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => {
                    const date = i + 1;
                    const hasInterview = interviews.some(int => 
                      new Date(int.date).getDate() === date
                    );
                    const interview = interviews.find(int => 
                      new Date(int.date).getDate() === date
                    );
                    
                    return (
                      <div 
                        key={date} 
                        className={`calendar-day ${hasInterview ? 'has-interview' : ''} ${date === 20 ? 'today' : ''}`}
                        title={interview ? `${interview.position} at ${interview.time}` : ''}
                      >
                        {date}
                        {hasInterview && <div className="interview-dot"></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="interviews-list">
          {filteredInterviews.map(interview => (
            <Card key={interview.id} className="interview-card" hover shadow="sm">
              <CardBody>
                <div className="interview-header">
                  <div className="interview-title">
                    <h3>{interview.position}</h3>
                    <div className="company-tag">{interview.company}</div>
                  </div>
                  <div className="interview-status" style={{ color: getStatusColor(interview.status) }}>
                    ● {interview.status}
                  </div>
                </div>

                <div className="interview-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <span className="detail-label">📅 Date:</span>
                      <span className="detail-value">{formatDate(interview.date)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">⏰ Time:</span>
                      <span className="detail-value">{interview.time}</span>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-item">
                      <span className="detail-label">⏱️ Duration:</span>
                      <span className="detail-value">{interview.duration}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">📍 Location:</span>
                      <span className="detail-value">{interview.location}</span>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-item">
                      <span className="detail-label">🎯 Stage:</span>
                      <span 
                        className="detail-value stage-tag"
                        style={{ 
                          backgroundColor: getStageColor(interview.stage) + '20',
                          color: getStageColor(interview.stage)
                        }}
                      >
                        {interview.stage}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">👥 Interviewers:</span>
                      <span className="detail-value">{interview.interviewers.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {interview.preparation && (
                  <div className="interview-preparation">
                    <div className="preparation-title">📝 Preparation:</div>
                    <div className="preparation-list">
                      {interview.preparation.split(', ').map((item, idx) => (
                        <span key={idx} className="preparation-tag">{item}</span>
                      ))}
                    </div>
                  </div>
                )}

                {interview.notes && (
                  <div className="interview-notes">
                    <div className="notes-title">💡 Notes:</div>
                    <div className="notes-content">{interview.notes}</div>
                  </div>
                )}

                {interview.feedback && (
                  <div className="interview-feedback">
                    <div className="feedback-title">📊 Feedback:</div>
                    <div className="feedback-content">
                      <div className="feedback-result">
                        <strong>Result:</strong> {interview.result}
                      </div>
                      <div className="feedback-text">{interview.feedback}</div>
                    </div>
                  </div>
                )}

                <div className="interview-actions">
                  {interview.status === 'Upcoming' && (
                    <>
                      <button className="action-btn primary">Join Interview</button>
                      <button className="action-btn">Reschedule</button>
                      <button className="action-btn">Add to Calendar</button>
                    </>
                  )}
                  {interview.status === 'Scheduled' && (
                    <>
                      <button className="action-btn primary">Prepare</button>
                      <button className="action-btn">Reschedule</button>
                      <button className="action-btn">Cancel</button>
                    </>
                  )}
                  {interview.status === 'Completed' && (
                    <>
                      <button className="action-btn">View Details</button>
                      <button className="action-btn">Request Feedback</button>
                    </>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyInterviews;