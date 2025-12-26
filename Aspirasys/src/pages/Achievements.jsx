import React, { useState, useEffect } from 'react';
import '../assets/styles/pages/Achievements.css';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    unlocked: 0,
    inProgress: 0,
    points: 0,
    streak: 0
  });

  // Mock data - replace with API call
  const mockAchievements = [
    {
      id: 1,
      title: 'Learning Pioneer',
      description: 'Complete your first course',
      icon: '🚀',
      category: 'learning',
      difficulty: 'easy',
      points: 100,
      progress: 100,
      status: 'unlocked',
      unlockedDate: '2024-01-15',
      requirements: ['Complete any course'],
      rarity: 'common',
      color: '#6366F1',
      gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
    },
    {
      id: 2,
      title: 'Perfect Score',
      description: 'Score 100% on any assessment',
      icon: '🎯',
      category: 'performance',
      difficulty: 'hard',
      points: 250,
      progress: 75,
      status: 'in-progress',
      unlockedDate: null,
      requirements: ['Complete an assessment with perfect score'],
      rarity: 'rare',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981, #34D399)'
    },
    {
      id: 3,
      title: 'Community Leader',
      description: 'Help 50 other learners',
      icon: '👑',
      category: 'community',
      difficulty: 'medium',
      points: 200,
      progress: 40,
      status: 'in-progress',
      unlockedDate: null,
      requirements: ['Answer 50 forum questions', 'Get 25 helpful votes'],
      rarity: 'uncommon',
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)'
    },
    {
      id: 4,
      title: 'Speed Learner',
      description: 'Complete 5 courses in one month',
      icon: '⚡',
      category: 'learning',
      difficulty: 'hard',
      points: 300,
      progress: 20,
      status: 'locked',
      unlockedDate: null,
      requirements: ['Complete 5 courses within 30 days'],
      rarity: 'epic',
      color: '#EC4899',
      gradient: 'linear-gradient(135deg, #EC4899, #F472B6)'
    },
    {
      id: 5,
      title: 'Early Bird',
      description: 'Complete a course before 8 AM',
      icon: '🌅',
      category: 'habits',
      difficulty: 'easy',
      points: 150,
      progress: 0,
      status: 'locked',
      unlockedDate: null,
      requirements: ['Finish a course session before 8:00 AM'],
      rarity: 'common',
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)'
    },
    {
      id: 6,
      title: 'Weekend Warrior',
      description: 'Spend 10+ hours learning on weekends',
      icon: '🏆',
      category: 'habits',
      difficulty: 'medium',
      points: 200,
      progress: 60,
      status: 'in-progress',
      unlockedDate: null,
      requirements: ['Accumulate 10 hours of weekend learning'],
      rarity: 'uncommon',
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)'
    },
    {
      id: 7,
      title: 'Subject Master',
      description: 'Master 3 advanced topics',
      icon: '🎓',
      category: 'expertise',
      difficulty: 'hard',
      points: 500,
      progress: 33,
      status: 'in-progress',
      unlockedDate: null,
      requirements: ['Complete 3 advanced certifications'],
      rarity: 'legendary',
      color: '#F97316',
      gradient: 'linear-gradient(135deg, #F97316, #FB923C)'
    },
    {
      id: 8,
      title: 'Consistency King',
      description: 'Maintain a 30-day learning streak',
      icon: '🔥',
      category: 'habits',
      difficulty: 'medium',
      points: 350,
      progress: 80,
      status: 'in-progress',
      unlockedDate: null,
      requirements: ['Learn for 30 consecutive days'],
      rarity: 'rare',
      color: '#EF4444',
      gradient: 'linear-gradient(135deg, #EF4444, #F87171)'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Achievements', icon: '🏆', count: 8 },
    { id: 'learning', name: 'Learning', icon: '📚', count: 2 },
    { id: 'performance', name: 'Performance', icon: '🎯', count: 1 },
    { id: 'community', name: 'Community', icon: '🤝', count: 1 },
    { id: 'habits', name: 'Habits', icon: '📅', count: 3 },
    { id: 'expertise', name: 'Expertise', icon: '🎓', count: 1 }
  ];

  const difficultyColors = {
    easy: '#10B981',
    medium: '#F59E0B',
    hard: '#EF4444'
  };

  const rarityColors = {
    common: '#6B7280',
    uncommon: '#10B981',
    rare: '#3B82F6',
    epic: '#8B5CF6',
    legendary: '#F59E0B'
  };

  useEffect(() => {
    // Simulate API call
    setAchievements(mockAchievements);
    
    // Calculate stats
    const total = mockAchievements.length;
    const unlocked = mockAchievements.filter(a => a.status === 'unlocked').length;
    const inProgress = mockAchievements.filter(a => a.status === 'in-progress').length;
    const points = mockAchievements
      .filter(a => a.status === 'unlocked')
      .reduce((sum, a) => sum + a.points, 0);
    
    setStats({
      total,
      unlocked,
      inProgress,
      points,
      streak: 7 // This would come from API
    });
  }, []);

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true;
    return achievement.category === filter;
  });

  const handleShare = (achievement) => {
    if (navigator.share) {
      navigator.share({
        title: `I unlocked: ${achievement.title}`,
        text: `Check out my achievement on Aspirasys: ${achievement.description}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`I unlocked: ${achievement.title} - ${achievement.description}`);
      alert('Achievement copied to clipboard!');
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return '#10B981';
    if (progress >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const AchievementCard = ({ achievement }) => (
    <div 
      className={`achievement-card ${achievement.status}`}
      onClick={() => setSelectedAchievement(achievement)}
    >
      <div 
        className="achievement-icon-container"
        style={{ background: achievement.gradient }}
      >
        <span className="achievement-icon">{achievement.icon}</span>
        {achievement.status === 'unlocked' && (
          <span className="unlocked-badge">✓</span>
        )}
      </div>
      
      <div className="achievement-content">
        <div className="achievement-header">
          <h3 className="achievement-title">{achievement.title}</h3>
          <span 
            className="difficulty-badge"
            style={{ backgroundColor: difficultyColors[achievement.difficulty] }}
          >
            {achievement.difficulty}
          </span>
        </div>
        
        <p className="achievement-description">{achievement.description}</p>
        
        <div className="achievement-meta">
          <div className="points-badge">
            <span className="points-icon">⭐</span>
            <span className="points-value">{achievement.points} pts</span>
          </div>
          <span 
            className="rarity-badge"
            style={{ color: rarityColors[achievement.rarity] }}
          >
            {achievement.rarity}
          </span>
        </div>
        
        <div className="progress-container">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span className="progress-percentage">{achievement.progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${achievement.progress}%`,
                backgroundColor: getProgressColor(achievement.progress)
              }}
            ></div>
          </div>
        </div>
        
        {achievement.status === 'unlocked' && achievement.unlockedDate && (
          <div className="unlocked-date">
            <span className="date-icon">📅</span>
            Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="achievements-page">
      {/* Animated Background */}
      <div className="achievements-background">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="floating-trophy"
            style={{
              '--delay': `${i * 0.3}s`,
              '--duration': `${10 + Math.random() * 10}s`,
              '--size': `${20 + Math.random() * 40}px`,
              '--opacity': `${0.1 + Math.random() * 0.2}`
            }}
          >
            🏆
          </div>
        ))}
      </div>

      <div className="achievements-container">
        {/* Header Section */}
        <header className="achievements-header">
          <div className="header-content">
            <div className="header-icon-container">
              <div className="header-icon-wrapper">
                <span className="header-icon">🏆</span>
                <div className="icon-glow"></div>
              </div>
            </div>
            <div>
              <h1 className="page-title">Achievements</h1>
              <p className="page-subtitle">
                Track your progress and celebrate milestones
              </p>
            </div>
          </div>
          
          <div className="header-stats">
            <button 
              className="share-button"
              onClick={() => handleShare({
                title: 'My Achievements Dashboard',
                description: `I've unlocked ${stats.unlocked} achievements with ${stats.points} points!`
              })}
            >
              <span className="share-icon">📤</span>
              Share Progress
            </button>
          </div>
        </header>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card total-achievements">
            <div className="stat-content">
              <span className="stat-icon">🏆</span>
              <div>
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Achievements</div>
              </div>
            </div>
            <div className="stat-progress"></div>
          </div>
          
          <div className="stat-card unlocked">
            <div className="stat-content">
              <span className="stat-icon">✅</span>
              <div>
                <div className="stat-number">{stats.unlocked}</div>
                <div className="stat-label">Unlocked</div>
              </div>
            </div>
            <div className="stat-progress">
              <div 
                className="progress-bar-fill"
                style={{ width: `${(stats.unlocked / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="stat-card in-progress">
            <div className="stat-content">
              <span className="stat-icon">⏳</span>
              <div>
                <div className="stat-number">{stats.inProgress}</div>
                <div className="stat-label">In Progress</div>
              </div>
            </div>
            <div className="stat-progress">
              <div 
                className="progress-bar-fill"
                style={{ width: `${(stats.inProgress / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="stat-card points">
            <div className="stat-content">
              <span className="stat-icon">⭐</span>
              <div>
                <div className="stat-number">{stats.points}</div>
                <div className="stat-label">Total Points</div>
              </div>
            </div>
            <div className="sparkle">✨</div>
          </div>
          
          <div className="stat-card streak">
            <div className="stat-content">
              <span className="stat-icon">🔥</span>
              <div>
                <div className="stat-number">{stats.streak}</div>
                <div className="stat-label">Day Streak</div>
              </div>
            </div>
            <div className="flame">🔥</div>
          </div>
          
          <div className="stat-card completion-rate">
            <div className="stat-content">
              <span className="stat-icon">📊</span>
              <div>
                <div className="stat-number">
                  {stats.total > 0 ? Math.round((stats.unlocked / stats.total) * 100) : 0}%
                </div>
                <div className="stat-label">Completion Rate</div>
              </div>
            </div>
            <div className="rate-graph">
              <div className="graph-bar" style={{ height: '60%' }}></div>
              <div className="graph-bar" style={{ height: '80%' }}></div>
              <div className="graph-bar" style={{ height: '40%' }}></div>
              <div className="graph-bar" style={{ height: '90%' }}></div>
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="categories-section">
          <h2 className="section-title">Categories</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-card ${filter === category.id ? 'active' : ''}`}
                onClick={() => setFilter(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <div className="category-info">
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </div>
                <div className="selection-indicator"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-section">
          <div className="section-header">
            <h2 className="section-title">
              {filter === 'all' ? 'All Achievements' : 
               categories.find(c => c.id === filter)?.name}
              <span className="count-badge">{filteredAchievements.length}</span>
            </h2>
            
            <div className="view-options">
              <span className="sort-label">Sort by:</span>
              <select className="sort-select">
                <option value="progress">Progress</option>
                <option value="difficulty">Difficulty</option>
                <option value="points">Points</option>
                <option value="recent">Recent</option>
              </select>
            </div>
          </div>
          
          {filteredAchievements.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏆</div>
              <h3>No achievements found</h3>
              <p>Try selecting a different category</p>
            </div>
          ) : (
            <div className="achievements-grid">
              {filteredAchievements.map(achievement => (
                <AchievementCard 
                  key={achievement.id} 
                  achievement={achievement} 
                />
              ))}
            </div>
          )}
        </div>

        {/* Motivation Section */}
        <div className="motivation-section">
          <div className="motivation-card">
            <div className="motivation-content">
              <span className="motivation-icon">💪</span>
              <div>
                <h3 className="motivation-title">Keep Going!</h3>
                <p className="motivation-text">
                  You're {Math.round((stats.unlocked / stats.total) * 100)}% through your achievement journey. 
                  Complete 3 more achievements to unlock the "Master Collector" badge!
                </p>
              </div>
            </div>
            <div className="motivation-progress">
              <div 
                className="motivation-progress-bar"
                style={{ width: `${(stats.unlocked / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="achievement-modal-overlay" onClick={() => setSelectedAchievement(null)}>
          <div className="achievement-modal" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedAchievement(null)}
            >
              ✕
            </button>
            
            <div className="modal-header">
              <div 
                className="modal-icon"
                style={{ background: selectedAchievement.gradient }}
              >
                {selectedAchievement.icon}
              </div>
              <div className="modal-title-section">
                <h2>{selectedAchievement.title}</h2>
                <div className="modal-tags">
                  <span 
                    className="modal-tag"
                    style={{ backgroundColor: difficultyColors[selectedAchievement.difficulty] }}
                  >
                    {selectedAchievement.difficulty}
                  </span>
                  <span 
                    className="modal-tag"
                    style={{ color: rarityColors[selectedAchievement.rarity] }}
                  >
                    {selectedAchievement.rarity}
                  </span>
                  <span className="modal-tag points">
                    ⭐ {selectedAchievement.points} points
                  </span>
                </div>
              </div>
            </div>
            
            <div className="modal-content">
              <p className="modal-description">{selectedAchievement.description}</p>
              
              <div className="modal-section">
                <h3>Requirements</h3>
                <ul className="requirements-list">
                  {selectedAchievement.requirements.map((req, index) => (
                    <li key={index}>
                      <span className="requirement-icon">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="modal-section">
                <h3>Progress</h3>
                <div className="modal-progress">
                  <div className="progress-info">
                    <span>{selectedAchievement.progress}% complete</span>
                    <span>{selectedAchievement.status === 'unlocked' ? 'Completed!' : 'In Progress'}</span>
                  </div>
                  <div className="progress-bar large">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${selectedAchievement.progress}%`,
                        backgroundColor: getProgressColor(selectedAchievement.progress)
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {selectedAchievement.status === 'unlocked' && selectedAchievement.unlockedDate && (
                <div className="modal-section">
                  <h3>Unlocked</h3>
                  <div className="unlocked-info">
                    <span className="date-icon">📅</span>
                    {new Date(selectedAchievement.unlockedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button 
                className="modal-action-button share"
                onClick={() => handleShare(selectedAchievement)}
              >
                <span>📤</span> Share Achievement
              </button>
              {selectedAchievement.status !== 'unlocked' && (
                <button className="modal-action-button track">
                  <span>🔔</span> Track Progress
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;