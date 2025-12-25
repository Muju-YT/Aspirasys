import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardTitle, CardDescription, CardFooter } from '../components/Card';
import '../assets/styles/pages/MyProjects.css';

const MyProjects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'Project Alpha',
      description: 'Modernization of legacy banking system with microservices architecture',
      status: 'In Progress',
      progress: 65,
      deadline: '2024-12-30',
      priority: 'High',
      team: [
        { name: 'John Doe', role: 'Lead', avatar: 'JD' },
        { name: 'Alex Johnson', role: 'Backend', avatar: 'AJ' },
        { name: 'Sarah Wilson', role: 'Frontend', avatar: 'SW' },
        { name: 'Mike Chen', role: 'DevOps', avatar: 'MC' },
        { name: 'Lisa Wang', role: 'QA', avatar: 'LW' },
      ],
      tasks: { total: 48, completed: 31 },
      budget: '$150,000',
      spent: '$98,500',
      timeline: '6 months',
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'MongoDB'],
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      name: 'Mobile App Redesign',
      description: 'Complete UI/UX overhaul of customer mobile application',
      status: 'Almost Done',
      progress: 90,
      deadline: '2024-12-15',
      priority: 'Medium',
      team: [
        { name: 'John Doe', role: 'Frontend', avatar: 'JD' },
        { name: 'Lisa Wang', role: 'Design', avatar: 'LW' },
        { name: 'Tom Harris', role: 'Mobile', avatar: 'TH' },
      ],
      tasks: { total: 36, completed: 32 },
      budget: '$75,000',
      spent: '$68,200',
      timeline: '4 months',
      technologies: ['React Native', 'Figma', 'Firebase', 'TypeScript'],
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: 'Data Analytics Dashboard',
      description: 'Real-time analytics platform for business intelligence',
      status: 'Planning',
      progress: 15,
      deadline: '2025-03-01',
      priority: 'High',
      team: [
        { name: 'John Doe', role: 'Architect', avatar: 'JD' },
        { name: 'David Lee', role: 'Data Eng', avatar: 'DL' },
        { name: 'Emma Rodriguez', role: 'BI Analyst', avatar: 'ER' },
      ],
      tasks: { total: 52, completed: 8 },
      budget: '$200,000',
      spent: '$25,000',
      timeline: '8 months',
      technologies: ['Python', 'D3.js', 'PostgreSQL', 'Apache Spark'],
      lastUpdated: '1 week ago'
    },
    {
      id: 4,
      name: 'E-commerce Platform',
      description: 'Build scalable online shopping platform',
      status: 'Completed',
      progress: 100,
      deadline: '2024-10-30',
      priority: 'Medium',
      team: [
        { name: 'John Doe', role: 'Full Stack', avatar: 'JD' },
        { name: 'Alex Johnson', role: 'Backend', avatar: 'AJ' },
        { name: 'Sarah Wilson', role: 'Frontend', avatar: 'SW' },
      ],
      tasks: { total: 42, completed: 42 },
      budget: '$120,000',
      spent: '$115,800',
      timeline: '5 months',
      technologies: ['Next.js', 'Stripe', 'Redis', 'Kubernetes'],
      lastUpdated: '2 weeks ago'
    },
    {
      id: 5,
      name: 'Internal Tools Upgrade',
      description: 'Update internal development and deployment tools',
      status: 'On Hold',
      progress: 30,
      deadline: '2025-01-15',
      priority: 'Low',
      team: [
        { name: 'John Doe', role: 'DevOps', avatar: 'JD' },
        { name: 'Mike Chen', role: 'Sys Admin', avatar: 'MC' },
      ],
      tasks: { total: 24, completed: 7 },
      budget: '$50,000',
      spent: '$15,000',
      timeline: '3 months',
      technologies: ['GitLab', 'Terraform', 'Ansible', 'Prometheus'],
      lastUpdated: '3 weeks ago'
    },
    {
      id: 6,
      name: 'AI Assistant Integration',
      description: 'Integrate AI assistant into customer support system',
      status: 'In Progress',
      progress: 45,
      deadline: '2025-02-28',
      priority: 'High',
      team: [
        { name: 'John Doe', role: 'AI Engineer', avatar: 'JD' },
        { name: 'Robert Kim', role: 'ML Engineer', avatar: 'RK' },
        { name: 'Maria Garcia', role: 'Backend', avatar: 'MG' },
      ],
      tasks: { total: 64, completed: 29 },
      budget: '$180,000',
      spent: '$75,000',
      timeline: '7 months',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'Redis'],
      lastUpdated: '3 days ago'
    },
  ];

  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    onBudget: projects.filter(p => {
      const spent = parseInt(p.spent.replace(/[^0-9]/g, ''));
      const budget = parseInt(p.budget.replace(/[^0-9]/g, ''));
      return spent <= budget;
    }).length,
  };

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => {
        if (activeFilter === 'active') {
          return ['In Progress', 'Almost Done', 'Planning'].includes(p.status);
        }
        return p.status.toLowerCase().replace(' ', '-') === activeFilter;
      });

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'var(--primary-color)';
      case 'Almost Done': return 'var(--success-color)';
      case 'Completed': return 'var(--success-color)';
      case 'Planning': return 'var(--warning-color)';
      case 'On Hold': return 'var(--danger-color)';
      default: return 'var(--text-tertiary)';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'var(--danger-color)';
      case 'Medium': return 'var(--warning-color)';
      case 'Low': return 'var(--success-color)';
      default: return 'var(--text-tertiary)';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'var(--success-color)';
    if (progress >= 70) return 'var(--primary-color)';
    if (progress >= 50) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  return (
    <div className="my-projects">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>My Projects</h1>
            <p className="page-subtitle">Manage and track your project portfolio</p>
          </div>
          <div className="header-actions">
            <button className="primary-btn">
              + New Project
            </button>
          </div>
        </div>
      </div>

      <div className="projects-stats">
        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon total">📁</div>
              <div className="stat-info">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Projects</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon active">🚀</div>
              <div className="stat-info">
                <div className="stat-number">{stats.inProgress}</div>
                <div className="stat-label">Active</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon completed">✅</div>
              <div className="stat-info">
                <div className="stat-number">{stats.completed}</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon budget">💰</div>
              <div className="stat-info">
                <div className="stat-number">{stats.onBudget}/{stats.total}</div>
                <div className="stat-label">On Budget</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="projects-controls">
        <div className="filter-tabs">
          {['all', 'active', 'in-progress', 'completed', 'planning', 'on-hold'].map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'all' ? 'All Projects' : 
               filter === 'active' ? 'Active' :
               filter === 'in-progress' ? 'In Progress' :
               filter === 'on-hold' ? 'On Hold' :
               filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="view-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search projects..."
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <select className="sort-select">
            <option value="deadline">Sort by Deadline</option>
            <option value="priority">Sort by Priority</option>
            <option value="progress">Sort by Progress</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <Card key={project.id} className="project-card" hover shadow="md">
            <CardBody>
              <div className="project-header">
                <div className="project-title-section">
                  <h3>{project.name}</h3>
                  <div className="project-meta">
                    <span 
                      className="project-status"
                      style={{ color: getStatusColor(project.status) }}
                    >
                      ● {project.status}
                    </span>
                    <span 
                      className="project-priority"
                      style={{ 
                        backgroundColor: getPriorityColor(project.priority) + '20',
                        color: getPriorityColor(project.priority)
                      }}
                    >
                      {project.priority} Priority
                    </span>
                  </div>
                </div>
                <div className="project-actions">
                  <button className="action-btn">⋯</button>
                </div>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-progress">
                <div className="progress-header">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: getProgressColor(project.progress)
                    }}
                  ></div>
                </div>
                <div className="progress-details">
                  <span>Tasks: {project.tasks.completed}/{project.tasks.total}</span>
                  <span className="deadline">Due: {project.deadline}</span>
                </div>
              </div>

              <div className="project-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">Timeline:</span>
                    <span className="detail-value">{project.timeline}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Budget:</span>
                    <span className="detail-value">{project.budget}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Spent:</span>
                    <span className="detail-value">{project.spent}</span>
                  </div>
                </div>
              </div>

              <div className="project-team">
                <div className="team-label">Team Members:</div>
                <div className="team-members">
                  {project.team.map((member, index) => (
                    <div key={index} className="team-member" title={`${member.name} (${member.role})`}>
                      <div className="member-avatar">{member.avatar}</div>
                    </div>
                  ))}
                  <button className="add-member-btn">+</button>
                </div>
              </div>

              <div className="project-technologies">
                <div className="tech-label">Technologies:</div>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-footer">
                <div className="last-updated">
                  Updated {project.lastUpdated}
                </div>
                <div className="project-buttons">
                  <button className="view-btn">View Details</button>
                  {project.status !== 'Completed' && (
                    <button className="update-btn">Update Progress</button>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="empty-state">
          <CardBody>
            <div className="empty-content">
              <div className="empty-icon">📁</div>
              <h3>No projects found</h3>
              <p>Try adjusting your filters or create a new project</p>
              <button className="primary-btn" onClick={() => setActiveFilter('all')}>
                View All Projects
              </button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MyProjects;