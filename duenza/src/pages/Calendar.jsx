import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTasks, sortTasksByDeadline } from '../utils/storage'
import './Calendar.css'

function Calendar() {
  const [tasks, setTasks] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTasks, setSelectedTasks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = () => {
    const allTasks = getTasks()
    const sortedTasks = sortTasksByDeadline(allTasks)
    setTasks(sortedTasks)
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    return { daysInMonth, startingDay, year, month }
  }

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.deadline)
      return taskDate.toDateString() === date.toDateString()
    })
  }

  const isUrgent = (date) => {
    const now = new Date()
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
    const dateObj = new Date(date)
    return dateObj <= twoDaysFromNow && dateObj >= now
  }

  const isOverdue = (date) => {
    const now = new Date()
    const dateObj = new Date(date)
    return dateObj < now
  }

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(clickedDate)
    const tasksForDate = getTasksForDate(clickedDate)
    setSelectedTasks(tasksForDate)
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setSelectedDate(null)
    setSelectedTasks([])
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setSelectedDate(null)
    setSelectedTasks([])
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  const { daysInMonth, startingDay, year, month } = getDaysInMonth(currentDate)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const renderCalendarDays = () => {
    const days = []
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const tasksForDay = getTasksForDate(date)
      const hasTasks = tasksForDay.length > 0
      const isUrgentDay = isUrgent(date)
      const isOverdueDay = isOverdue(date)
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString()
      const isToday = new Date().toDateString() === date.toDateString()
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${hasTasks ? 'has-tasks' : ''} ${isUrgentDay ? 'urgent' : ''} ${isOverdueDay ? 'overdue' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {hasTasks && (
            <div className="task-indicators">
              {tasksForDay.slice(0, 3).map((task, index) => (
                <div 
                  key={task.id} 
                  className={`task-dot ${task.priority === 'high' ? 'high-priority' : ''}`}
                  title={task.name}
                ></div>
              ))}
              {tasksForDay.length > 3 && (
                <div className="more-tasks">+{tasksForDay.length - 3}</div>
              )}
            </div>
          )}
        </div>
      )
    }
    
    return days
  }

  return (
    <div className="calendar-container">
      <div className="calendar-card">
        <header className="calendar-header">
          <button className="back-btn" onClick={handleBackToDashboard}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div className="header-content">
            <div className="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h1>Calendar View</h1>
            <p>See your deadlines at a glance</p>
          </div>
        </header>

        <div className="calendar-navigation">
          <button className="nav-btn" onClick={handlePrevMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <h2 className="current-month">{monthNames[month]} {year}</h2>
          <button className="nav-btn" onClick={handleNextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="calendar-grid">
          <div className="day-headers">
            {dayNames.map(day => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>
          <div className="days-grid">
            {renderCalendarDays()}
          </div>
        </div>

        {selectedDate && (
          <div className="selected-date-tasks">
            <div className="selected-date-header">
              <h3>
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <span className="task-count">{selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''}</span>
            </div>
            
            {selectedTasks.length === 0 ? (
              <div className="no-tasks-message">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p>No tasks scheduled for this date</p>
              </div>
            ) : (
              <div className="tasks-list">
                {selectedTasks.map(task => (
                  <div key={task.id} className={`task-item ${task.priority === 'high' ? 'high-priority' : ''}`}>
                    <div className="task-info">
                      <span className="task-name">{task.name}</span>
                      <span className="task-subject">{task.subject}</span>
                    </div>
                    <div className="task-meta">
                      <span className={`priority-badge ${task.priority}`}>
                        {task.priority}
                      </span>
                      <span className="task-time">
                        {new Date(task.deadline).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-dot today"></div>
            <span>Today</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot urgent"></div>
            <span>Urgent (2 days)</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot overdue"></div>
            <span>Overdue</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot high-priority"></div>
            <span>High Priority</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar