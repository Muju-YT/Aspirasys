import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardTitle, CardDescription, CardFooter } from '../components/Card';
import '../assets/styles/pages/MyProfile.css';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    personal: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@aspirasys.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1990-05-15',
      location: 'San Francisco, CA',
      timezone: 'Pacific Time (PT)',
      bio: 'Senior Frontend Engineer with 8+ years of experience in building scalable web applications. Passionate about React, TypeScript, and modern frontend architectures.',
    },
    professional: {
      employeeId: 'ASP-2023-0456',
      department: 'Engineering',
      position: 'Senior Frontend Engineer',
      manager: 'Sarah Wilson',
      hireDate: '2023-03-15',
      level: 'L5',
      skills: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'GraphQL', 'UI/UX', 'AWS'],
      certifications: ['AWS Certified Developer', 'React Advanced Certification'],
    },
    education: [
      {
        id: 1,
        degree: 'Master of Science',
        field: 'Computer Science',
        institution: 'Stanford University',
        year: '2014',
        gpa: '3.8'
      },
      {
        id: 2,
        degree: 'Bachelor of Science',
        field: 'Software Engineering',
        institution: 'MIT',
        year: '2012',
        gpa: '3.9'
      }
    ],
    experience: [
      {
        id: 1,
        title: 'Senior Frontend Engineer',
        company: 'Aspirasys',
        period: '2023 - Present',
        description: 'Lead frontend development for enterprise applications.'
      },
      {
        id: 2,
        title: 'Frontend Engineer',
        company: 'TechCorp',
        period: '2019 - 2023',
        description: 'Built and maintained customer-facing web applications.'
      }
    ],
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      weeklyDigest: true,
      productUpdates: true,
      language: 'English',
      theme: 'Light',
    }
  });

  const handleInputChange = (section, field, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleAddItem = (section, template) => {
    setProfile(prev => ({
      ...prev,
      [section]: [...prev[section], { ...template, id: Date.now() }]
    }));
  };

  const handleRemoveItem = (section, id) => {
    setProfile(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would make an API call here
    console.log('Profile saved:', profile);
  };

  const renderField = (label, value, field, section) => (
    <div className="profile-field">
      <label className="field-label">{label}</label>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(section, field, e.target.value)}
          className="field-input"
        />
      ) : (
        <div className="field-value">{value}</div>
      )}
    </div>
  );

  return (
    <div className="my-profile">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>My Profile</h1>
            <p className="page-subtitle">Manage your personal and professional information</p>
          </div>
          <div className="header-actions">
            {isEditing ? (
              <>
                <button className="secondary-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button className="primary-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </>
            ) : (
              <button className="primary-btn" onClick={() => setIsEditing(true)}>
                ✏️ Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-sidebar">
          <Card className="profile-card">
            <CardBody>
              <div className="avatar-section">
                <div className="profile-avatar-large">
                  <span>JD</span>
                </div>
                <div className="avatar-info">
                  <h2>{profile.personal.firstName} {profile.personal.lastName}</h2>
                  <p className="position">{profile.professional.position}</p>
                  <p className="department">{profile.professional.department}</p>
                </div>
              </div>

              <div className="stats-section">
                <div className="stat-item">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Active Courses</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">12</div>
                  <div className="stat-label">Achievements</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">2.5</div>
                  <div className="stat-label">Years at Company</div>
                </div>
              </div>

              <div className="quick-info">
                <div className="info-item">
                  <span className="info-label">Employee ID:</span>
                  <span className="info-value">{profile.professional.employeeId}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Manager:</span>
                  <span className="info-value">{profile.professional.manager}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Level:</span>
                  <span className="info-value">{profile.professional.level}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Hire Date:</span>
                  <span className="info-value">{profile.professional.hireDate}</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="skills-card">
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="skills-list">
                {profile.professional.skills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    {skill}
                    {isEditing && (
                      <button 
                        className="skill-remove"
                        onClick={() => handleRemoveItem('professional', skill)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <input
                    type="text"
                    placeholder="Add skill..."
                    className="skill-input"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        setProfile(prev => ({
                          ...prev,
                          professional: {
                            ...prev.professional,
                            skills: [...prev.professional.skills, e.target.value.trim()]
                          }
                        }));
                        e.target.value = '';
                      }
                    }}
                  />
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="profile-content">
          <div className="profile-tabs">
            {['personal', 'professional', 'education', 'experience', 'preferences'].map(tab => (
              <button
                key={tab}
                className={`profile-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <Card className="profile-details-card">
            <CardBody>
              {activeTab === 'personal' && (
                <div className="tab-content personal-info">
                  <h3>Personal Information</h3>
                  <div className="form-grid">
                    {renderField('First Name', profile.personal.firstName, 'firstName', 'personal')}
                    {renderField('Last Name', profile.personal.lastName, 'lastName', 'personal')}
                    {renderField('Email Address', profile.personal.email, 'email', 'personal')}
                    {renderField('Phone Number', profile.personal.phone, 'phone', 'personal')}
                    {renderField('Date of Birth', profile.personal.dateOfBirth, 'dateOfBirth', 'personal')}
                    {renderField('Location', profile.personal.location, 'location', 'personal')}
                    {renderField('Timezone', profile.personal.timezone, 'timezone', 'personal')}
                  </div>
                  
                  <div className="profile-field full-width">
                    <label className="field-label">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={profile.personal.bio}
                        onChange={(e) => handleInputChange('personal', 'bio', e.target.value)}
                        className="field-textarea"
                        rows={4}
                      />
                    ) : (
                      <div className="field-value">{profile.personal.bio}</div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'professional' && (
                <div className="tab-content professional-info">
                  <h3>Professional Information</h3>
                  <div className="form-grid">
                    {renderField('Position', profile.professional.position, 'position', 'professional')}
                    {renderField('Department', profile.professional.department, 'department', 'professional')}
                    {renderField('Employee ID', profile.professional.employeeId, 'employeeId', 'professional')}
                    {renderField('Manager', profile.professional.manager, 'manager', 'professional')}
                    {renderField('Hire Date', profile.professional.hireDate, 'hireDate', 'professional')}
                    {renderField('Level', profile.professional.level, 'level', 'professional')}
                  </div>

                  <div className="certifications-section">
                    <h4>Certifications</h4>
                    <div className="certifications-list">
                      {profile.professional.certifications.map((cert, index) => (
                        <div key={index} className="certification-item">
                          <span className="certification-badge">🏆</span>
                          <span className="certification-name">{cert}</span>
                          {isEditing && (
                            <button 
                              className="remove-btn"
                              onClick={() => handleRemoveItem('professional', cert)}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <input
                          type="text"
                          placeholder="Add certification..."
                          className="certification-input"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              setProfile(prev => ({
                                ...prev,
                                professional: {
                                  ...prev.professional,
                                  certifications: [...prev.professional.certifications, e.target.value.trim()]
                                }
                              }));
                              e.target.value = '';
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="tab-content education-info">
                  <div className="section-header">
                    <h3>Education</h3>
                    {isEditing && (
                      <button 
                        className="add-btn"
                        onClick={() => handleAddItem('education', {
                          degree: '',
                          field: '',
                          institution: '',
                          year: '',
                          gpa: ''
                        })}
                      >
                        + Add Education
                      </button>
                    )}
                  </div>
                  
                  <div className="education-list">
                    {profile.education.map((edu, index) => (
                      <Card key={edu.id} className="education-card">
                        <CardBody>
                          <div className="education-header">
                            <div className="education-degree">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={edu.degree}
                                  onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                                  className="education-input"
                                  placeholder="Degree"
                                />
                              ) : (
                                <div className="degree-name">{edu.degree}</div>
                              )}
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={edu.field}
                                  onChange={(e) => handleArrayChange('education', index, 'field', e.target.value)}
                                  className="education-input"
                                  placeholder="Field of Study"
                                />
                              ) : (
                                <div className="field-name">{edu.field}</div>
                              )}
                            </div>
                            {isEditing && (
                              <button 
                                className="remove-btn"
                                onClick={() => handleRemoveItem('education', edu.id)}
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                          
                          <div className="education-details">
                            {isEditing ? (
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                                className="education-input"
                                placeholder="Institution"
                              />
                            ) : (
                              <div className="institution">{edu.institution}</div>
                            )}
                            
                            <div className="education-meta">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={edu.year}
                                  onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                                  className="education-input small"
                                  placeholder="Year"
                                />
                              ) : (
                                <div className="year">{edu.year}</div>
                              )}
                              
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={edu.gpa}
                                  onChange={(e) => handleArrayChange('education', index, 'gpa', e.target.value)}
                                  className="education-input small"
                                  placeholder="GPA"
                                />
                              ) : (
                                <div className="gpa">GPA: {edu.gpa}</div>
                              )}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="tab-content experience-info">
                  <div className="section-header">
                    <h3>Work Experience</h3>
                    {isEditing && (
                      <button 
                        className="add-btn"
                        onClick={() => handleAddItem('experience', {
                          title: '',
                          company: '',
                          period: '',
                          description: ''
                        })}
                      >
                        + Add Experience
                      </button>
                    )}
                  </div>
                  
                  <div className="experience-list">
                    {profile.experience.map((exp, index) => (
                      <Card key={exp.id} className="experience-card">
                        <CardBody>
                          <div className="experience-header">
                            <div className="experience-title">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={exp.title}
                                  onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
                                  className="experience-input"
                                  placeholder="Job Title"
                                />
                              ) : (
                                <div className="job-title">{exp.title}</div>
                              )}
                              
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={exp.company}
                                  onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                                  className="experience-input"
                                  placeholder="Company"
                                />
                              ) : (
                                <div className="company-name">{exp.company}</div>
                              )}
                            </div>
                            
                            {isEditing ? (
                              <input
                                type="text"
                                value={exp.period}
                                onChange={(e) => handleArrayChange('experience', index, 'period', e.target.value)}
                                className="period-input"
                                placeholder="Period"
                              />
                            ) : (
                              <div className="period">{exp.period}</div>
                            )}
                          </div>
                          
                          {isEditing ? (
                            <textarea
                              value={exp.description}
                              onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                              className="experience-textarea"
                              placeholder="Description"
                              rows={3}
                            />
                          ) : (
                            <div className="description">{exp.description}</div>
                          )}
                          
                          {isEditing && (
                            <div className="experience-actions">
                              <button 
                                className="remove-btn"
                                onClick={() => handleRemoveItem('experience', exp.id)}
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="tab-content preferences-info">
                  <h3>Preferences & Settings</h3>
                  
                  <div className="preferences-section">
                    <h4>Notifications</h4>
                    <div className="preferences-list">
                      {Object.entries(profile.preferences).map(([key, value]) => {
                        if (typeof value === 'boolean') {
                          return (
                            <div key={key} className="preference-item">
                              <label className="preference-label">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </label>
                              <div className="toggle-switch">
                                <input
                                  type="checkbox"
                                  id={key}
                                  checked={value}
                                  onChange={(e) => handleInputChange('preferences', key, e.target.checked)}
                                  className="toggle-input"
                                />
                                <label htmlFor={key} className="toggle-slider"></label>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>

                  <div className="preferences-section">
                    <h4>Language & Appearance</h4>
                    <div className="preference-item">
                      <label className="preference-label">Language</label>
                      <select
                        value={profile.preferences.language}
                        onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                        className="preference-select"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                    <div className="preference-item">
                      <label className="preference-label">Theme</label>
                      <div className="theme-options">
                        {['Light', 'Dark', 'Auto'].map(theme => (
                          <button
                            key={theme}
                            className={`theme-option ${profile.preferences.theme === theme ? 'active' : ''}`}
                            onClick={() => handleInputChange('preferences', 'theme', theme)}
                          >
                            {theme}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
            
            {isEditing && (
              <CardFooter>
                <div className="profile-actions">
                  <button className="secondary-btn" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button className="primary-btn" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;