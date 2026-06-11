import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTasks, sortTasksByDeadline, getUser, clearUser, getStudentProfile } from '../utils/storage'
import TaskCard from '../components/TaskCard'
import './Dashboard.css'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()
  const user = getUser()
  const studentProfile = getStudentProfile()

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    filterTasks()
  }, [tasks, filter])

  const loadTasks = async () => {
    const allTasks = await getTasks()
    const sortedTasks = sortTasksByDeadline(allTasks)
    setTasks(sortedTasks)
  }

  const filterTasks = () => {
    let filtered = [...tasks]
    const now = new Date()
    
    switch (filter) {
      case 'urgent':
        filtered = tasks.filter(task => {
          const deadline = new Date(task.deadline)
          const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
          return deadline <= twoDaysFromNow && deadline >= now
        })
        break
      case 'overdue':
        filtered = tasks.filter(task => {
          const deadline = new Date(task.deadline)
          return deadline < now
        })
        break
      case 'completed':
        filtered = []
        break
      default:
        filtered = tasks
    }
    
    setFilteredTasks(filtered)
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const handleLogout = () => {
    clearUser()
    navigate('/')
  }

  const now = new Date()
  const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
  const urgentCount = tasks.filter(task => {
    const deadline = new Date(task.deadline)
    return deadline <= twoDaysFromNow && deadline >= now
  }).length
  const overdueCount = tasks.filter(task => {
    const deadline = new Date(task.deadline)
    return deadline < now
  }).length
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => new Date(task.deadline) < new Date()).length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Extract first name from full name
  const getFirstName = () => {
    if (studentProfile?.fullName) {
      return studentProfile.fullName.split(' ')[0]
    }
    if (user?.name) {
      return user.name.split(' ')[0]
    }
    return 'Student'
  }

  // Get motivational message based on time of day and task status
  const getMotivationalMessage = () => {
    const hour = new Date().getHours()
    
    if (overdueCount > 0) {
      return "You have overdue tasks. Let's get back on track!"
    }
    
    if (urgentCount > 0) {
      return "Deadlines approaching. You've got this!"
    }
    
    if (totalTasks === 0) {
      return "Ready to start your academic journey?"
    }
    
    if (hour < 12) {
      return "Good morning! Let's make today productive."
    } else if (hour < 17) {
      return "Good afternoon! Keep up the great work."
    } else if (hour < 21) {
      return "Good evening! Time for focused study."
    } else {
      return "Late night study session? Stay focused!"
    }
  }

  // Get upcoming deadlines (next 3 days)
  const getUpcomingDeadlines = () => {
    const now = new Date()
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
    
    return tasks.filter(task => {
      const deadline = new Date(task.deadline)
      return deadline >= now && deadline <= threeDaysFromNow
    }).slice(0, 3)
  }

  // Get year level display text
  const getYearLevelText = () => {
    if (!studentProfile?.yearLevel) return ''
    
    const yearMap = {
      '1': '1st Year',
      '2': '2nd Year', 
      '3': '3rd Year',
      '4': '4th Year',
      '5': '5th Year',
      'graduate': 'Graduate',
      'postgraduate': 'Postgraduate'
    }
    
    return yearMap[studentProfile.yearLevel] || studentProfile.yearLevel
  }

  // Smart Insights Functions
  const getHighPriorityTasks = () => {
    return tasks.filter(task => task.priority === 'high')
  }

  const getThisWeekDeadlines = () => {
    const now = new Date()
    const endOfWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    return tasks.filter(task => {
      const deadline = new Date(task.deadline)
      return deadline >= now && deadline <= endOfWeek
    })
  }

  const getProductivityTip = () => {
    const highPriorityCount = getHighPriorityTasks().length
    const thisWeekCount = getThisWeekDeadlines().length
    
    if (overdueCount > 2) {
      return "Consider breaking down overdue tasks into smaller, manageable steps."
    }
    
    if (highPriorityCount > 3) {
      return "You have many high-priority tasks. Focus on one at a time for better results."
    }
    
    if (thisWeekCount > 5) {
      return "Busy week ahead! Start early to avoid last-minute stress."
    }
    
    if (completionRate > 80) {
      return "Excellent progress! You're staying on top of your assignments."
    }
    
    if (totalTasks === 0) {
      return "Add your first task to get started with smart planning."
    }
    
    return "Break large tasks into smaller chunks for better productivity."
  }

  const getMotivationalInsight = () => {
    if (completionRate >= 90) {
      return "Outstanding! You're almost at 100% completion. Keep up the amazing work!"
    }
    
    if (completionRate >= 70) {
      return "Great job staying on track with your assignments!"
    }
    
    if (overdueCount === 0 && totalTasks > 0) {
      return "Perfect! No overdue tasks. You're managing your time well."
    }
    
    if (urgentCount > 0 && overdueCount === 0) {
      return "You have upcoming deadlines but no overdue tasks. Stay focused!"
    }
    
    if (totalTasks > 0 && completionRate < 30) {
      return "Every task completed is progress. You're building good habits!"
    }
    
    return "Consistent effort leads to success. Keep going!"
  }

  const upcomingDeadlines = getUpcomingDeadlines()
  const highPriorityTasks = getHighPriorityTasks()
  const thisWeekDeadlines = getThisWeekDeadlines()

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        {/* Enhanced Header with Personalization */}
        <header className="dashboard-header">
          <div className="header-left">
            <div className="welcome-section">
              <h1>Welcome back, {getFirstName()}! 👋</h1>
              <p className="motivational-message">{getMotivationalMessage()}</p>
            </div>
            
            {studentProfile && (
              <div className="student-info">
                {studentProfile.universityName && (
                  <span className="university-badge">{studentProfile.universityName}</span>
                )}
                {studentProfile.degree && (
                  <span className="degree-badge">{studentProfile.degree}</span>
                )}
                {studentProfile.yearLevel && (
                  <span className="year-badge">{getYearLevelText()}</span>
                )}
              </div>
            )}
          </div>
          
          <div className="header-right">
            <button className="calendar-btn" onClick={() => navigate('/calendar')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Calendar
            </button>
            <button className="profile-btn" onClick={() => navigate('/student-profile')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile
            </button>
            <button className="reminders-btn" onClick={() => navigate('/reminders')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              Reminders
              {(urgentCount > 0 || overdueCount > 0) && (
                <span className="reminder-badge">{urgentCount + overdueCount}</span>
              )}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </header>

        {/* Enhanced Dashboard Overview */}
        <div className="dashboard-overview">
          {/* Task Completion Stats */}
          <div className="stats-overview">
            <div className="stat-highlight">
              <div className="stat-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-percentage">{completionRate}%</span>
                <span className="stat-description">Completion Rate</span>
              </div>
            </div>
            
            <div className="motivational-quote">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
              </svg>
              <span>"Small progress is still progress. Keep going!"</span>
            </div>
          </div>

          {/* Overdue Warning */}
          {overdueCount > 0 && (
            <div className="overdue-warning">
              <div className="warning-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div className="warning-content">
                <h4>Overdue Tasks Alert</h4>
                <p>You have {overdueCount} overdue task{overdueCount > 1 ? 's' : ''}. Consider updating deadlines or completing them to reduce stress.</p>
              </div>
              <button className="warning-action" onClick={() => setFilter('overdue')}>
                View Overdue
              </button>
            </div>
          )}

          {/* Upcoming Deadlines */}
          {upcomingDeadlines.length > 0 && (
            <div className="upcoming-deadlines">
              <div className="section-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <h3>Upcoming Deadlines</h3>
              </div>
              <div className="deadlines-list">
                {upcomingDeadlines.map(task => (
                  <div key={task.id} className="deadline-item">
                    <div className="deadline-info">
                      <span className="task-name">{task.name}</span>
                      <span className="task-subject">{task.subject}</span>
                    </div>
                    <div className="deadline-date">
                      {new Date(task.deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Daily Focus Card */}
          <div className="daily-focus-card">
            <div className="daily-focus-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <h3>Daily Focus</h3>
            </div>
            
            {studentProfile?.academicGoals ? (
              <div className="academic-goals">
                <p>{studentProfile.academicGoals}</p>
              </div>
            ) : (
              <div className="no-goals">
                <p>Set your academic goals to stay focused and motivated!</p>
                <button className="set-goals-btn" onClick={() => navigate('/student-profile')}>
                  Set Goals
                </button>
              </div>
            )}
            
            <div className="study-tip">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>Tip: Break large tasks into smaller, manageable chunks for better productivity.</span>
            </div>
          </div>
        </div>

        {/* Smart Insights Section */}
        <div className="smart-insights">
          <div className="section-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4"></path>
              <path d="m4.93 4.93 2.83 2.83"></path>
              <path d="M2 12h4"></path>
              <path d="m4.93 19.07 2.83-2.83"></path>
              <path d="M12 18v4"></path>
              <path d="m19.07 19.07-2.83-2.83"></path>
              <path d="M18 12h4"></path>
              <path d="m19.07 4.93-2.83 2.83"></path>
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
            <h3>Smart Insights</h3>
          </div>
          
          <div className="insights-grid">
            {/* Task Overview Card */}
            <div className="insight-card">
              <div className="insight-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <div className="insight-content">
                <span className="insight-number">{totalTasks}</span>
                <span className="insight-label">Total Tasks</span>
              </div>
            </div>

            {/* Overdue Tasks Card */}
            <div className="insight-card">
              <div className="insight-icon overdue">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="insight-content">
                <span className="insight-number">{overdueCount}</span>
                <span className="insight-label">Overdue Tasks</span>
              </div>
            </div>

            {/* High Priority Card */}
            <div className="insight-card">
              <div className="insight-icon high-priority">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div className="insight-content">
                <span className="insight-number">{highPriorityTasks.length}</span>
                <span className="insight-label">High Priority</span>
              </div>
            </div>

            {/* This Week Card */}
            <div className="insight-card">
              <div className="insight-icon this-week">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="insight-content">
                <span className="insight-number">{thisWeekDeadlines.length}</span>
                <span className="insight-label">Due This Week</span>
              </div>
            </div>
          </div>

          {/* Productivity Tips */}
          <div className="productivity-tips">
            <div className="tip-card">
              <div className="tip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div className="tip-content">
                <h4>Productivity Tip</h4>
                <p>{getProductivityTip()}</p>
              </div>
            </div>

            <div className="tip-card motivational">
              <div className="tip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div className="tip-content">
                <h4>Motivational Insight</h4>
                <p>{getMotivationalInsight()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon total">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-number">{tasks.length}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon urgent">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-number">{urgentCount}</span>
              <span className="stat-label">Due Soon</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon overdue">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-number">{overdueCount}</span>
              <span className="stat-label">Overdue</span>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <button className="add-task-btn" onClick={() => navigate('/add-task')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Task
          </button>
        </div>

        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Tasks
          </button>
          <button 
            className={`filter-tab ${filter === 'urgent' ? 'active' : ''}`}
            onClick={() => setFilter('urgent')}
          >
            Due Soon
          </button>
          <button 
            className={`filter-tab ${filter === 'overdue' ? 'active' : ''}`}
            onClick={() => setFilter('overdue')}
          >
            Overdue
          </button>
        </div>

        <div className="tasks-section">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-illustration">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <div className="empty-sparkle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
              </div>
              <h3>Ready to get started? ✨</h3>
              <p>{filter === 'all' 
                ? "Your task list is empty. Add your first assignment and take control of your academic success!" 
                : `No ${filter} tasks at the moment. Great job staying on top of your work!`}
              </p>
              {filter === 'all' && (
                <button className="empty-cta-btn" onClick={() => navigate('/add-task')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Create Your First Task
                </button>
              )}
            </div>
          ) : (
            <div className="tasks-grid">
              {filteredTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard