import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardTitle, CardDescription, CardFooter } from '../components/Card';
import '../assets/styles/pages/MyCourses.css';

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    {
      id: 1,
      title: 'React Advanced Patterns',
      instructor: 'Alex Johnson',
      progress: 75,
      duration: '8 weeks',
      category: 'Frontend',
      status: 'In Progress',
      thumbnail: '📘',
      description: 'Master advanced React patterns and best practices for scalable applications.',
      enrolledDate: '2024-10-15',
      deadline: '2024-12-15',
      rating: 4.8,
      modules: 12,
      completedModules: 9
    },
    {
      id: 2,
      title: 'Microservices Architecture',
      instructor: 'Sarah Williams',
      progress: 30,
      duration: '12 weeks',
      category: 'Backend',
      status: 'In Progress',
      thumbnail: '🏗️',
      description: 'Design and implement scalable microservices architecture.',
      enrolledDate: '2024-11-01',
      deadline: '2025-02-01',
      rating: 4.6,
      modules: 16,
      completedModules: 5
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Michael Chen',
      progress: 100,
      duration: '6 weeks',
      category: 'Design',
      status: 'Completed',
      thumbnail: '🎨',
      description: 'Learn fundamental UI/UX design principles and prototyping.',
      enrolledDate: '2024-09-01',
      completedDate: '2024-10-15',
      rating: 4.9,
      modules: 8,
      completedModules: 8,
      certificate: true
    },
    {
      id: 4,
      title: 'Cloud Infrastructure',
      instructor: 'David Lee',
      progress: 0,
      duration: '10 weeks',
      category: 'DevOps',
      status: 'Not Started',
      thumbnail: '☁️',
      description: 'Master AWS, Azure, and GCP for enterprise applications.',
      rating: 4.7,
      modules: 14
    },
    {
      id: 5,
      title: 'Data Structures & Algorithms',
      instructor: 'Emma Wilson',
      progress: 45,
      duration: '8 weeks',
      category: 'Computer Science',
      status: 'In Progress',
      thumbnail: '📊',
      description: 'Essential data structures and algorithms for technical interviews.',
      enrolledDate: '2024-10-20',
      deadline: '2024-12-20',
      rating: 4.5,
      modules: 10,
      completedModules: 4.5
    },
    {
      id: 6,
      title: 'Leadership & Management',
      instructor: 'Robert Kim',
      progress: 100,
      duration: '4 weeks',
      category: 'Soft Skills',
      status: 'Completed',
      thumbnail: '👥',
      description: 'Develop leadership skills for technical team management.',
      enrolledDate: '2024-08-01',
      completedDate: '2024-08-29',
      rating: 4.8,
      modules: 6,
      completedModules: 6,
      certificate: true
    },
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Design', 'DevOps', 'Computer Science', 'Soft Skills'];
  const statuses = ['all', 'in-progress', 'completed', 'not-started'];

  const filteredCourses = courses.filter(course => {
    if (activeTab !== 'all' && course.status.toLowerCase() !== activeTab.toLowerCase()) {
      return false;
    }
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'var(--success-color)';
      case 'in progress': return 'var(--primary-color)';
      case 'not started': return 'var(--text-tertiary)';
      default: return 'var(--warning-color)';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Frontend': '#3b82f6',
      'Backend': '#10b981',
      'Design': '#8b5cf6',
      'DevOps': '#f59e0b',
      'Computer Science': '#ef4444',
      'Soft Skills': '#6366f1',
    };
    return colors[category] || 'var(--text-tertiary)';
  };

  return (
    <div className="my-courses">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>My Courses</h1>
            <p className="page-subtitle">Track your learning progress and enrolled courses</p>
          </div>
          <div className="header-actions">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            <button className="primary-btn">
              + Enroll in Course
            </button>
          </div>
        </div>
      </div>

      <div className="courses-stats">
        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon total-courses">📚</div>
              <div className="stat-info">
                <div className="stat-number">{courses.length}</div>
                <div className="stat-label">Total Courses</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon in-progress">⏳</div>
              <div className="stat-info">
                <div className="stat-number">{courses.filter(c => c.status === 'In Progress').length}</div>
                <div className="stat-label">In Progress</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon completed">✅</div>
              <div className="stat-info">
                <div className="stat-number">{courses.filter(c => c.status === 'Completed').length}</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon avg-progress">📈</div>
              <div className="stat-info">
                <div className="stat-number">
                  {Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)}%
                </div>
                <div className="stat-label">Avg Progress</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="courses-controls">
        <div className="tabs">
          {statuses.map(status => (
            <button
              key={status}
              className={`tab-btn ${activeTab === status ? 'active' : ''}`}
              onClick={() => setActiveTab(status)}
            >
              {status === 'all' ? 'All Courses' : 
               status === 'in-progress' ? 'In Progress' :
               status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="tab-count">
                {status === 'all' ? courses.length :
                 courses.filter(c => c.status.toLowerCase().replace(' ', '-') === status).length}
              </span>
            </button>
          ))}
        </div>

        <div className="category-filters">
          <select className="category-select">
            <option value="">All Categories</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select className="sort-select">
            <option value="progress">Sort by Progress</option>
            <option value="title">Sort by Title</option>
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <Card key={course.id} className="course-card" hover shadow="md">
            <CardBody>
              <div className="course-header">
                <div className="course-thumbnail">{course.thumbnail}</div>
                <div className="course-meta">
                  <div className="course-category" style={{ backgroundColor: getCategoryColor(course.category) + '20', color: getCategoryColor(course.category) }}>
                    {course.category}
                  </div>
                  <div className="course-status" style={{ color: getStatusColor(course.status) }}>
                    ● {course.status}
                  </div>
                </div>
              </div>

              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                
                <div className="course-instructor">
                  <span className="instructor-label">Instructor:</span>
                  <span className="instructor-name">{course.instructor}</span>
                </div>

                <div className="course-rating">
                  {'★'.repeat(Math.floor(course.rating))}
                  {'☆'.repeat(5 - Math.floor(course.rating))}
                  <span className="rating-value">{course.rating}</span>
                </div>

                {course.status !== 'Not Started' && (
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${course.progress}%`,
                          backgroundColor: getStatusColor(course.status)
                        }}
                      ></div>
                    </div>
                    <div className="progress-details">
                      <span>{course.completedModules || 0}/{course.modules} modules</span>
                      {course.deadline && (
                        <span className="deadline">Due: {course.deadline}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="course-actions">
                {course.status === 'Not Started' ? (
                  <button className="start-btn">Start Course</button>
                ) : course.status === 'Completed' ? (
                  <div className="completed-actions">
                    {course.certificate && (
                      <button className="certificate-btn">📜 View Certificate</button>
                    )}
                    <button className="review-btn">Write Review</button>
                  </div>
                ) : (
                  <button className="continue-btn">Continue Learning</button>
                )}
                <button className="more-btn">⋯</button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card className="empty-state">
          <CardBody>
            <div className="empty-content">
              <div className="empty-icon">📚</div>
              <h3>No courses found</h3>
              <p>Try adjusting your filters or search query</p>
              <button className="primary-btn" onClick={() => { setActiveTab('all'); setSearchQuery(''); }}>
                View All Courses
              </button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MyCourses;