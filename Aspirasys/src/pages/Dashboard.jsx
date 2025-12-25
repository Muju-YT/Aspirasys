import React from 'react';
import Card, { CardHeader, CardBody, CardTitle, CardDescription } from '../components/Card';
import '../assets/styles/pages/Dashboard.css';

const Dashboard = () => {
  const stats = [
    { label: 'Active Courses', value: 3, icon: '📚', color: 'primary' },
    { label: 'Ongoing Projects', value: 2, icon: '🚀', color: 'success' },
    { label: 'Upcoming Interviews', value: 1, icon: '💼', color: 'warning' },
    { label: 'Achievements', value: 12, icon: '🏆', color: 'info' },
  ];

  const recentActivities = [
    { time: '2 hours ago', activity: 'Completed "React Advanced Patterns" course', type: 'course' },
    { time: 'Yesterday', activity: 'Submitted Project Alpha deliverables', type: 'project' },
    { time: '2 days ago', activity: 'Achieved "Fast Learner" badge', type: 'achievement' },
    { time: '1 week ago', activity: 'Interview scheduled for Senior Role', type: 'interview' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, John! 👋</h1>
        <p className="dashboard-subtitle">
          Here's what's happening with your professional development today.
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <Card key={stat.label} hover shadow="md" className="stat-card">
            <CardBody>
              <div className="stat-content">
                <div className="stat-icon" data-color={stat.color}>
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-column">
          <Card className="recent-activities">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest achievements and updates</CardDescription>
            </CardHeader>
            <CardBody>
              <div className="activities-list">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon" data-type={activity.type}>
                      {activity.type === 'course' && '📚'}
                      {activity.type === 'project' && '🚀'}
                      {activity.type === 'achievement' && '🏆'}
                      {activity.type === 'interview' && '💼'}
                    </div>
                    <div className="activity-content">
                      <div className="activity-text">{activity.activity}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="dashboard-column">
          <Card className="daily-progress">
            <CardHeader>
              <CardTitle>Daily Goals</CardTitle>
              <CardDescription>Track your daily learning progress</CardDescription>
            </CardHeader>
            <CardBody>
              <div className="progress-item">
                <div className="progress-info">
                  <span>Complete 1 course module</span>
                  <span>75%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="progress-item">
                <div className="progress-info">
                  <span>Work on project tasks</span>
                  <span>50%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div className="progress-item">
                <div className="progress-info">
                  <span>Review interview materials</span>
                  <span>25%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '25%' }}></div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="announcements-preview">
            <CardHeader>
              <CardTitle>Latest Announcements</CardTitle>
              <CardDescription>Important company updates</CardDescription>
            </CardHeader>
            <CardBody>
              <div className="announcement-item">
                <div className="announcement-title">New Learning Platform Launch</div>
                <div className="announcement-date">Dec 1, 2024</div>
                <div className="announcement-preview">
                  We're excited to announce our new learning management system with enhanced features...
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;