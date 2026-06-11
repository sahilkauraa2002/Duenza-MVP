import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUrgentTasks, getOverdueTasks, sortTasksByDeadline } from '../utils/storage'
import TaskCard from '../components/TaskCard'
import './Reminders.css'

function Reminders() {
  const [urgentTasks, setUrgentTasks] = useState([])
  const [overdueTasks, setOverdueTasks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadReminders()
  }, [])

  const loadReminders = async () => {
    const urgent = sortTasksByDeadline(await getUrgentTasks())
    const overdue = sortTasksByDeadline(await getOverdueTasks())
    setUrgentTasks(urgent)
    setOverdueTasks(overdue)
  }

  const handleDeleteTask = (taskId) => {
    setUrgentTasks(urgentTasks.filter(task => task.id !== taskId))
    setOverdueTasks(overdueTasks.filter(task => task.id !== taskId))
  }

  const totalReminders = urgentTasks.length + overdueTasks.length

  return (
    <div className="reminders-container">
      <div className="reminders-card">
        <header className="reminders-header">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div className="header-content">
            <h1>Reminders</h1>
            <p>{totalReminders} task{totalReminders !== 1 ? 's' : ''} need{totalReminders === 1 ? 's' : ''} your attention</p>
          </div>
        </header>

        <div className="reminders-content">
          {overdueTasks.length > 0 && (
            <section className="reminders-section">
              <div className="section-header overdue">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h2>Overdue ({overdueTasks.length})</h2>
              </div>
              <div className="tasks-list">
                {overdueTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            </section>
          )}

          {urgentTasks.length > 0 && (
            <section className="reminders-section">
              <div className="section-header urgent">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <h2>Due Soon ({urgentTasks.length})</h2>
              </div>
              <div className="tasks-list">
                {urgentTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            </section>
          )}

          {totalReminders === 0 && (
            <div className="empty-reminders">
              <div className="empty-illustration">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
                <div className="empty-sparkle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
              </div>
              <h3>All caught up! 🎉</h3>
              <p>No urgent or overdue tasks at the moment. Great job staying on top of your assignments! Keep up the excellent work.</p>
              <button className="empty-cta-btn" onClick={() => navigate('/add-task')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add New Task
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reminders