import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardTitle, CardDescription, CardFooter } from '../components/Card';
import '../assets/styles/pages/DailyGoals.css';

const DailyGoals = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Complete React course module', completed: true, priority: 'high', timeEstimate: '2h' },
    { id: 2, title: 'Review project documentation', completed: true, priority: 'medium', timeEstimate: '1h' },
    { id: 3, title: 'Prepare for team meeting', completed: false, priority: 'high', timeEstimate: '45m' },
    { id: 4, title: 'Code review for PR #123', completed: false, priority: 'medium', timeEstimate: '1.5h' },
    { id: 5, title: 'Learn about new API features', completed: false, priority: 'low', timeEstimate: '1h' },
    { id: 6, title: 'Update personal development plan', completed: false, priority: 'low', timeEstimate: '30m' },
  ]);

  const [newGoal, setNewGoal] = useState('');
  const [priority, setPriority] = useState('medium');
  const [timeEstimate, setTimeEstimate] = useState('1h');

  const toggleGoal = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    
    const newGoalObj = {
      id: goals.length + 1,
      title: newGoal,
      completed: false,
      priority,
      timeEstimate,
    };
    
    setGoals([...goals, newGoalObj]);
    setNewGoal('');
    setPriority('medium');
    setTimeEstimate('1h');
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;
  const completionPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'var(--danger-color)';
      case 'medium': return 'var(--warning-color)';
      case 'low': return 'var(--success-color)';
      default: return 'var(--text-tertiary)';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="daily-goals">
      <div className="page-header">
        <h1>Daily Goals</h1>
        <p className="page-subtitle">Track and manage your daily objectives</p>
      </div>

      <div className="goals-overview">
        <Card className="overview-card">
          <CardBody>
            <div className="overview-content">
              <div className="overview-stat">
                <div className="stat-value">{completionPercentage}%</div>
                <div className="stat-label">Completion Rate</div>
              </div>
              <div className="progress-circle">
                <svg width="80" height="80" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--border-color)"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--primary-color)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${completionPercentage}, 100`}
                  />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stats-card">
          <CardBody>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">🎯</div>
                <div>
                  <div className="stat-number">{totalGoals}</div>
                  <div className="stat-text">Total Goals</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">✅</div>
                <div>
                  <div className="stat-number">{completedGoals}</div>
                  <div className="stat-text">Completed</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">⏱️</div>
                <div>
                  <div className="stat-number">{goals.filter(g => !g.completed).length}</div>
                  <div className="stat-text">Pending</div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="goals-container">
        <div className="goals-column">
          <Card className="goals-list-card">
            <CardHeader>
              <CardTitle>Today's Goals</CardTitle>
              <CardDescription>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
            </CardHeader>
            <CardBody>
              <div className="goals-list">
                {goals.map((goal) => (
                  <div key={goal.id} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
                    <div className="goal-checkbox">
                      <input
                        type="checkbox"
                        id={`goal-${goal.id}`}
                        checked={goal.completed}
                        onChange={() => toggleGoal(goal.id)}
                      />
                      <label htmlFor={`goal-${goal.id}`}></label>
                    </div>
                    <div className="goal-content">
                      <div className="goal-title">{goal.title}</div>
                      <div className="goal-meta">
                        <span className="goal-priority" style={{ color: getPriorityColor(goal.priority) }}>
                          {getPriorityIcon(goal.priority)} {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                        </span>
                        <span className="goal-time">⏱️ {goal.timeEstimate}</span>
                      </div>
                    </div>
                    <button 
                      className="goal-delete"
                      onClick={() => deleteGoal(goal.id)}
                      aria-label="Delete goal"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </CardBody>
            <CardFooter>
              <div className="add-goal-form">
                <input
                  type="text"
                  placeholder="Add a new goal..."
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                  className="goal-input"
                />
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  className="priority-select"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <select 
                  value={timeEstimate} 
                  onChange={(e) => setTimeEstimate(e.target.value)}
                  className="time-select"
                >
                  <option value="15m">15m</option>
                  <option value="30m">30m</option>
                  <option value="45m">45m</option>
                  <option value="1h">1h</option>
                  <option value="1.5h">1.5h</option>
                  <option value="2h">2h</option>
                  <option value="3h">3h+</option>
                </select>
                <button onClick={addGoal} className="add-goal-btn">
                  Add Goal
                </button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="goals-column">
          <Card className="productivity-card">
            <CardHeader>
              <CardTitle>Productivity Tips</CardTitle>
              <CardDescription>Boost your daily efficiency</CardDescription>
            </CardHeader>
            <CardBody>
              <div className="tips-list">
                <div className="tip-item">
                  <div className="tip-icon">🍅</div>
                  <div className="tip-content">
                    <div className="tip-title">Pomodoro Technique</div>
                    <div className="tip-description">Work in 25-minute focused intervals with 5-minute breaks</div>
                  </div>
                </div>
                <div className="tip-item">
                  <div className="tip-icon">🎯</div>
                  <div className="tip-content">
                    <div className="tip-title">Eat the Frog</div>
                    <div className="tip-description">Tackle your most challenging task first thing in the morning</div>
                  </div>
                </div>
                <div className="tip-item">
                  <div className="tip-icon">📋</div>
                  <div className="tip-content">
                    <div className="tip-title">Time Blocking</div>
                    <div className="tip-description">Schedule specific time slots for different types of work</div>
                  </div>
                </div>
                <div className="tip-item">
                  <div className="tip-icon">🚫</div>
                  <div className="tip-content">
                    <div className="tip-title">Minimize Distractions</div>
                    <div className="tip-description">Turn off non-essential notifications during focused work</div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="streak-card">
            <CardHeader>
              <CardTitle>Current Streak</CardTitle>
              <CardDescription>Days in a row completing all goals</CardDescription>
            </CardHeader>
            <CardBody>
              <div className="streak-display">
                <div className="streak-number">12</div>
                <div className="streak-label">days</div>
              </div>
              <div className="streak-calendar">
                {Array.from({ length: 30 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (29 - i));
                  const hasGoal = i >= 15; // Simulated data
                  return (
                    <div key={i} className={`calendar-day ${hasGoal ? 'has-goal' : ''}`}>
                      {date.getDate()}
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailyGoals;