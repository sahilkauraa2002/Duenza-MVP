import { useState } from 'react'
import { deleteTask } from '../utils/storage'
import './TaskCard.css'

function TaskCard({ task, onDelete, showDelete = true }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return { bg: 'rgba(239, 68, 68, 0.2)', text: '#f87171', border: 'rgba(239, 68, 68, 0.3)' }
      case 'medium':
        return { bg: 'rgba(245, 158, 11, 0.2)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' }
      case 'low':
        return { bg: 'rgba(107, 114, 128, 0.2)', text: '#9ca3af', border: 'rgba(107, 114, 128, 0.3)' }
      default:
        return { bg: 'rgba(107, 114, 128, 0.2)', text: '#9ca3af', border: 'rgba(107, 114, 128, 0.3)' }
    }
  }

  const isUrgent = () => {
    const now = new Date()
    const deadline = new Date(task.deadline)
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
    return deadline <= twoDaysFromNow && deadline >= now
  }

  const isOverdue = () => {
    const now = new Date()
    const deadline = new Date(task.deadline)
    return deadline < now
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteTask(task.id)
      if (onDelete) onDelete(task.id)
    } catch (error) {
      console.error('Failed to delete task:', error)
      setIsDeleting(false)
    }
  }

  const priorityColors = getPriorityColor(task.priority)

  return (
    <div className={`task-card ${isUrgent() ? 'urgent' : ''} ${isOverdue() ? 'overdue' : ''} ${isDeleting ? 'deleting' : ''}`}>
      <div className="task-header">
        <h3 className="task-name">{task.name}</h3>
        {showDelete && (
          <button className="delete-btn" onClick={handleDelete} aria-label="Delete task">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        )}
      </div>
      
      <div className="task-details">
        <span className="task-subject">{task.subject}</span>
        <span 
          className="task-priority"
          style={{ 
            backgroundColor: priorityColors.bg,
            color: priorityColors.text,
            border: `1px solid ${priorityColors.border}`
          }}
        >
          {task.priority}
        </span>
      </div>
      
      <div className="task-deadline">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>{formatDate(task.deadline)}</span>
        {isUrgent() && <span className="urgent-badge">Due Soon!</span>}
        {isOverdue() && <span className="overdue-badge">Overdue!</span>}
      </div>
    </div>
  )
}

export default TaskCard