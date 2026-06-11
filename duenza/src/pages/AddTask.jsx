import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveTask } from '../utils/storage'
import './AddTask.css'

function AddTask() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    deadline: '',
    priority: 'medium'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log('Field changed:', name, 'Value:', value) // Debug log
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    if (formData.name && formData.subject && formData.deadline && !isSubmitting) {
      setIsSubmitting(true)
      try {
        console.log('Saving task...')
        const savedTask = await saveTask(formData)
        console.log('Task saved:', savedTask)
        navigate('/confirmation')
      } catch (error) {
        console.error('Failed to save task:', error)
        alert('Failed to save task: ' + (error.message || 'Unknown error'))
      } finally {
        setIsSubmitting(false)
      }
    } else {
      console.log('Form validation failed')
    }
  }

  const isFormValid = formData.name && formData.subject && formData.deadline
  
  // Debug form state
  console.log('Form data:', formData)
  console.log('Is form valid:', isFormValid)
  console.log('Name:', formData.name, 'Subject:', formData.subject, 'Deadline:', formData.deadline)

  return (
    <div className="add-task-container">
      <div className="add-task-card">
        <div className="add-task-header">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div className="header-content">
            <h1>Add New Task</h1>
            <p>Create a new assignment to track</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="add-task-form">
          <div className="form-group">
            <label htmlFor="name">Task Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Complete essay assignment"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., English Literature"
            />
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
             type="date"
        
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <div className="priority-options">
              <label className={`priority-option ${formData.priority === 'low' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={formData.priority === 'low'}
                  onChange={handleChange}
                />
                <span className="priority-label low">Low</span>
              </label>
              <label className={`priority-option ${formData.priority === 'medium' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={formData.priority === 'medium'}
                  onChange={handleChange}
                />
                <span className="priority-label medium">Medium</span>
              </label>
              <label className={`priority-option ${formData.priority === 'high' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={formData.priority === 'high'}
                  onChange={handleChange}
                />
                <span className="priority-label high">High</span>
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn">
  Add Task
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
    <polyline points="9 11 12 14 22 4"></polyline>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
  </svg>
</button>
        </form>
      </div>
    </div>
  )
}

export default AddTask