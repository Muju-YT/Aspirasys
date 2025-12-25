import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardTitle, CardDescription, CardFooter } from '../components/Card';
import '../assets/styles/pages/MyTimesheets.css';

const MyTimesheets = () => {
  const [activeView, setActiveView] = useState('weekly');
  const [selectedWeek, setSelectedWeek] = useState('2024-12-16');
  const [timeEntries, setTimeEntries] = useState([
    {
      id: 1,
      date: '2024-12-16',
      project: 'Project Alpha',
      task: 'Frontend Development',
      description: 'Implement user authentication flow',
      hours: 8,
      billable: true,
      status: 'Approved'
    },
    {
      id: 2,
      date: '2024-12-16',
      project: 'Mobile App Redesign',
      task: 'UI Design Review',
      description: 'Review design mockups and provide feedback',
      hours: 2,
      billable: true,
      status: 'Approved'
    },
    {
      id: 3,
      date: '2024-12-17',
      project: 'Project Alpha',
      task: 'Code Review',
      description: 'Review PRs and provide feedback',
      hours: 3,
      billable: true,
      status: 'Approved'
    },
    {
      id: 4,
      date: '2024-12-17',
      project: 'Data Analytics Dashboard',
      task: 'Planning',
      description: 'Project kickoff and planning session',
      hours: 5,
      billable: true,
      status: 'Submitted'
    },
    {
      id: 5,
      date: '2024-12-18',
      project: 'Project Alpha',
      task: 'Frontend Development',
      description: 'Build dashboard components',
      hours: 7.5,
      billable: true,
      status: 'Submitted'
    },
    {
      id: 6,
      date: '2024-12-18',
      project: 'Internal Training',
      task: 'Learning',
      description: 'React Advanced Patterns course',
      hours: 1.5,
      billable: false,
      status: 'Submitted'
    },
    {
      id: 7,
      date: '2024-12-19',
      project: 'Project Alpha',
      task: 'Team Meeting',
      description: 'Weekly sync and planning',
      hours: 1,
      billable: true,
      status: 'Draft'
    },
    {
      id: 8,
      date: '2024-12-19',
      project: 'Mobile App Redesign',
      task: 'Development',
      description: 'Implement navigation components',
      hours: 6.5,
      billable: true,
      status: 'Draft'
    },
    {
      id: 9,
      date: '2024-12-19',
      project: 'General',
      task: 'Admin',
      description: 'Time tracking and documentation',
      hours: 1,
      billable: false,
      status: 'Draft'
    },
    {
      id: 10,
      date: '2024-12-20',
      project: 'AI Assistant Integration',
      task: 'Research',
      description: 'Evaluate AI model options',
      hours: 4,
      billable: true,
      status: 'Draft'
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    project: '',
    task: '',
    description: '',
    hours: '',
    billable: true,
    date: new Date().toISOString().split('T')[0]
  });

  const projects = [
    'Project Alpha',
    'Mobile App Redesign',
    'Data Analytics Dashboard',
    'E-commerce Platform',
    'Internal Tools Upgrade',
    'AI Assistant Integration',
    'General',
    'Internal Training'
  ];

  const tasks = {
    'Project Alpha': ['Frontend Development', 'Backend Development', 'Code Review', 'Testing', 'Team Meeting'],
    'Mobile App Redesign': ['UI Design', 'Development', 'Testing', 'Design Review'],
    'Data Analytics Dashboard': ['Planning', 'Development', 'Data Analysis'],
    'AI Assistant Integration': ['Research', 'Development', 'Integration'],
    'General': ['Admin', 'Meetings', 'Documentation'],
    'Internal Training': ['Learning', 'Certification'],
  };

  const weeks = [
    { label: 'This Week (Dec 16-20)', value: '2024-12-16' },
    { label: 'Last Week (Dec 9-13)', value: '2024-12-09' },
    { label: 'Dec 2-6', value: '2024-12-02' },
  ];

  const calculateStats = () => {
    const weeklyEntries = timeEntries.filter(entry => 
      new Date(entry.date) >= new Date(selectedWeek) && 
      new Date(entry.date) < new Date(new Date(selectedWeek).setDate(new Date(selectedWeek).getDate() + 7))
    );

    const totalHours = weeklyEntries.reduce((sum, entry) => sum + entry.hours, 0);
    const billableHours = weeklyEntries.filter(e => e.billable).reduce((sum, entry) => sum + entry.hours, 0);
    const submittedHours = weeklyEntries.filter(e => e.status === 'Submitted' || e.status === 'Approved').reduce((sum, entry) => sum + entry.hours, 0);
    const approvedHours = weeklyEntries.filter(e => e.status === 'Approved').reduce((sum, entry) => sum + entry.hours, 0);

    return { totalHours, billableHours, submittedHours, approvedHours };
  };

  const stats = calculateStats();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'var(--success-color)';
      case 'Submitted': return 'var(--primary-color)';
      case 'Draft': return 'var(--warning-color)';
      case 'Rejected': return 'var(--danger-color)';
      default: return 'var(--text-tertiary)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return '✅';
      case 'Submitted': return '📤';
      case 'Draft': return '📝';
      case 'Rejected': return '❌';
      default: return '⏳';
    }
  };

  const addTimeEntry = () => {
    if (!newEntry.project || !newEntry.task || !newEntry.hours) return;

    const entry = {
      id: timeEntries.length + 1,
      date: newEntry.date,
      project: newEntry.project,
      task: newEntry.task,
      description: newEntry.description,
      hours: parseFloat(newEntry.hours),
      billable: newEntry.billable,
      status: 'Draft'
    };

    setTimeEntries([entry, ...timeEntries]);
    setNewEntry({
      project: '',
      task: '',
      description: '',
      hours: '',
      billable: true,
      date: new Date().toISOString().split('T')[0]
    });
  };

  const deleteTimeEntry = (id) => {
    setTimeEntries(timeEntries.filter(entry => entry.id !== id));
  };

  const submitTimesheet = () => {
    const weeklyEntries = timeEntries.filter(entry => 
      new Date(entry.date) >= new Date(selectedWeek) && 
      new Date(entry.date) < new Date(new Date(selectedWeek).setDate(new Date(selectedWeek).getDate() + 7))
    );

    const updatedEntries = weeklyEntries.map(entry => 
      entry.status === 'Draft' ? { ...entry, status: 'Submitted' } : entry
    );

    setTimeEntries(timeEntries.map(entry => {
      const updated = updatedEntries.find(e => e.id === entry.id);
      return updated || entry;
    }));

    alert('Timesheet submitted successfully!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const weeklyEntries = timeEntries.filter(entry => 
    new Date(entry.date) >= new Date(selectedWeek) && 
    new Date(entry.date) < new Date(new Date(selectedWeek).setDate(new Date(selectedWeek).getDate() + 7))
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  const dailyTotals = {};
  weeklyEntries.forEach(entry => {
    if (!dailyTotals[entry.date]) {
      dailyTotals[entry.date] = 0;
    }
    dailyTotals[entry.date] += entry.hours;
  });

  return (
    <div className="my-timesheets">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>My Timesheets</h1>
            <p className="page-subtitle">Track and submit your working hours</p>
          </div>
          <div className="header-actions">
            <button className="primary-btn" onClick={submitTimesheet}>
              📤 Submit Timesheet
            </button>
          </div>
        </div>
      </div>

      <div className="timesheet-stats">
        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon total">⏱️</div>
              <div className="stat-info">
                <div className="stat-number">{stats.totalHours.toFixed(1)}</div>
                <div className="stat-label">Total Hours</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon billable">💰</div>
              <div className="stat-info">
                <div className="stat-number">{stats.billableHours.toFixed(1)}</div>
                <div className="stat-label">Billable Hours</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon submitted">📤</div>
              <div className="stat-info">
                <div className="stat-number">{stats.submittedHours.toFixed(1)}</div>
                <div className="stat-label">Submitted Hours</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-icon approved">✅</div>
              <div className="stat-info">
                <div className="stat-number">{stats.approvedHours.toFixed(1)}</div>
                <div className="stat-label">Approved Hours</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="timesheet-controls">
        <div className="view-tabs">
          {['weekly', 'daily', 'calendar'].map(view => (
            <button
              key={view}
              className={`view-tab ${activeView === view ? 'active' : ''}`}
              onClick={() => setActiveView(view)}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)} View
            </button>
          ))}
        </div>

        <div className="period-controls">
          <select 
            className="week-select"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
          >
            {weeks.map(week => (
              <option key={week.value} value={week.value}>{week.label}</option>
            ))}
          </select>
          <button className="export-btn">
            📥 Export
          </button>
        </div>
      </div>

      <div className="timesheet-container">
        <div className="timesheet-sidebar">
          <Card className="add-entry-card">
            <CardHeader>
              <CardTitle>Add Time Entry</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="entry-form">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Project</label>
                  <select
                    value={newEntry.project}
                    onChange={(e) => {
                      setNewEntry({
                        ...newEntry, 
                        project: e.target.value,
                        task: '' // Reset task when project changes
                      });
                    }}
                    className="form-select"
                  >
                    <option value="">Select Project</option>
                    {projects.map(project => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Task</label>
                  <select
                    value={newEntry.task}
                    onChange={(e) => setNewEntry({...newEntry, task: e.target.value})}
                    className="form-select"
                    disabled={!newEntry.project}
                  >
                    <option value="">Select Task</option>
                    {newEntry.project && tasks[newEntry.project]?.map(task => (
                      <option key={task} value={task}>{task}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    value={newEntry.description}
                    onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                    className="form-textarea"
                    placeholder="What did you work on?"
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hours</label>
                  <input
                    type="number"
                    min="0.5"
                    max="24"
                    step="0.5"
                    value={newEntry.hours}
                    onChange={(e) => setNewEntry({...newEntry, hours: e.target.value})}
                    className="form-input"
                    placeholder="0.0"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={newEntry.billable}
                      onChange={(e) => setNewEntry({...newEntry, billable: e.target.checked})}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">Billable</span>
                  </label>
                </div>

                <button 
                  className="add-entry-btn"
                  onClick={addTimeEntry}
                  disabled={!newEntry.project || !newEntry.task || !newEntry.hours}
                >
                  + Add Entry
                </button>
              </div>
            </CardBody>
          </Card>

          <Card className="weekly-summary-card">
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="summary-list">
                {Object.entries(dailyTotals).map(([date, hours]) => (
                  <div key={date} className="summary-item">
                    <div className="summary-date">{formatDate(date)}</div>
                    <div className="summary-hours">{hours.toFixed(1)} hours</div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="timesheet-content">
          <Card className="timesheet-table-card">
            <CardHeader>
              <CardTitle>Time Entries</CardTitle>
              <CardDescription>Week of {formatDate(selectedWeek)}</CardDescription>
            </CardHeader>
            <CardBody>
              <div className="timesheet-table-container">
                <table className="timesheet-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Project</th>
                      <th>Task</th>
                      <th>Description</th>
                      <th>Hours</th>
                      <th>Billable</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyEntries.length > 0 ? (
                      weeklyEntries.map(entry => (
                        <tr key={entry.id}>
                          <td className="date-cell">{formatDate(entry.date)}</td>
                          <td className="project-cell">{entry.project}</td>
                          <td className="task-cell">{entry.task}</td>
                          <td className="description-cell">
                            <div className="description-content">{entry.description}</div>
                          </td>
                          <td className="hours-cell">
                            <div className="hours-badge">{entry.hours.toFixed(1)}</div>
                          </td>
                          <td className="billable-cell">
                            <span className={`billable-tag ${entry.billable ? 'billable' : 'non-billable'}`}>
                              {entry.billable ? '💰 Yes' : '📝 No'}
                            </span>
                          </td>
                          <td className="status-cell">
                            <span 
                              className="status-tag"
                              style={{ 
                                backgroundColor: getStatusColor(entry.status) + '20',
                                color: getStatusColor(entry.status)
                              }}
                            >
                              {getStatusIcon(entry.status)} {entry.status}
                            </span>
                          </td>
                          <td className="actions-cell">
                            <div className="action-buttons">
                              {entry.status === 'Draft' && (
                                <>
                                  <button className="edit-btn" title="Edit">
                                    ✏️
                                  </button>
                                  <button 
                                    className="delete-btn" 
                                    onClick={() => deleteTimeEntry(entry.id)}
                                    title="Delete"
                                  >
                                    🗑️
                                  </button>
                                </>
                              )}
                              {entry.status === 'Submitted' && (
                                <button className="view-btn" title="View">
                                  👁️
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="empty-cell">
                          <div className="empty-state">
                            <div className="empty-icon">⏱️</div>
                            <div className="empty-text">No time entries for this week</div>
                            <div className="empty-subtext">Add your first time entry above</div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="4" className="total-label">
                        <strong>Weekly Total:</strong>
                      </td>
                      <td className="total-hours">
                        <strong>{stats.totalHours.toFixed(1)}</strong>
                      </td>
                      <td colSpan="3"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardBody>
            <CardFooter>
              <div className="timesheet-footer">
                <div className="status-legend">
                  <div className="legend-item">
                    <span className="legend-dot draft"></span>
                    <span>Draft</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot submitted"></span>
                    <span>Submitted</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot approved"></span>
                    <span>Approved</span>
                  </div>
                </div>
                <div className="footer-actions">
                  <button className="save-btn">Save Draft</button>
                  <button className="submit-btn" onClick={submitTimesheet}>
                    Submit for Approval
                  </button>
                </div>
              </div>
            </CardFooter>
          </Card>

          <div className="timesheet-notes">
            <Card>
              <CardHeader>
                <CardTitle>Timesheet Notes</CardTitle>
              </CardHeader>
              <CardBody>
                <textarea 
                  className="notes-textarea"
                  placeholder="Add any notes or comments for this timesheet..."
                  rows={4}
                />
                <div className="notes-actions">
                  <button className="save-notes-btn">Save Notes</button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTimesheets;