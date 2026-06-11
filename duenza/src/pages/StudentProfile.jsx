import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStudentProfile, saveStudentProfile, getUser, getNotificationPreferences, saveNotificationPreferences } from '../utils/storage'
import './StudentProfile.css'

function StudentProfile() {
  const navigate = useNavigate()
  const user = getUser()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    universityName: '',
    degree: '',
    yearLevel: '',
    studentId: '',
    preferredStudyHours: '',
    academicGoals: ''
  })
  const [notificationPreferences, setNotificationPreferences] = useState({
    remindersEnabled: true,
    reminderFrequency: 'daily',
    preferredTiming: 'morning',
    studyFocusMode: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const profile = getStudentProfile()
    if (profile) {
      setFormData(profile)
    } else if (user?.name) {
      setFormData(prev => ({ ...prev, fullName: user.name }))
    }
    
    // Load notification preferences
    const preferences = getNotificationPreferences()
    setNotificationPreferences(preferences)
  }, [user])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.universityName.trim()) {
      newErrors.universityName = 'University name is required'
    }
    
    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree/Course is required'
    }
    
    if (!formData.yearLevel) {
      newErrors.yearLevel = 'Year level is required'
    }
    
    if (!formData.preferredStudyHours) {
      newErrors.preferredStudyHours = 'Preferred study hours is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleNotificationChange = (e) => {
    const { name, value, type, checked } = e.target
    setNotificationPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    setTimeout(() => {
      saveStudentProfile(formData)
      saveNotificationPreferences(notificationPreferences)
      navigate('/onboarding')
    }, 500)
  }

  return (
    <div className="student-profile-container">
      <div className="student-profile-card">
        <div className="profile-header">
          <div className="profile-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h1>Student Profile Setup</h1>
          <p>Complete your profile to personalize your experience</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="universityName">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                University Name *
              </label>
              <input
                type="text"
                id="universityName"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                placeholder="Enter your university name"
                className={errors.universityName ? 'error' : ''}
              />
              {errors.universityName && <span className="error-text">{errors.universityName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="degree">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                Degree / Course *
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="e.g., Computer Science"
                className={errors.degree ? 'error' : ''}
              />
              {errors.degree && <span className="error-text">{errors.degree}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="yearLevel">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Year Level *
              </label>
              <select
                id="yearLevel"
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleChange}
                className={errors.yearLevel ? 'error' : ''}
              >
                <option value="">Select year level</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
                <option value="graduate">Graduate</option>
                <option value="postgraduate">Postgraduate</option>
              </select>
              {errors.yearLevel && <span className="error-text">{errors.yearLevel}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="studentId">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Student ID (Optional)
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter your student ID"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="preferredStudyHours">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Preferred Study Hours *
            </label>
            <select
              id="preferredStudyHours"
              name="preferredStudyHours"
              value={formData.preferredStudyHours}
              onChange={handleChange}
              className={errors.preferredStudyHours ? 'error' : ''}
            >
              <option value="">Select preferred hours</option>
              <option value="morning">Morning (6 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
              <option value="evening">Evening (6 PM - 10 PM)</option>
              <option value="night">Night (10 PM - 2 AM)</option>
              <option value="flexible">Flexible</option>
            </select>
            {errors.preferredStudyHours && <span className="error-text">{errors.preferredStudyHours}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="academicGoals">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Academic Goals
            </label>
            <textarea
              id="academicGoals"
              name="academicGoals"
              value={formData.academicGoals}
              onChange={handleChange}
              placeholder="Describe your academic goals and what you want to achieve..."
              rows="4"
            />
          </div>

          {/* Notification Preferences Section */}
          <div className="notification-preferences-section">
            <div className="section-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <h3>Notification Preferences</h3>
            </div>
            
            <div className="preferences-grid">
              {/* Enable/Disable Reminders Toggle */}
              <div className="preference-item">
                <div className="preference-info">
                  <label htmlFor="remindersEnabled">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    Enable Reminders
                  </label>
                  <p>Receive notifications for upcoming deadlines</p>
                </div>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="remindersEnabled"
                    name="remindersEnabled"
                    checked={notificationPreferences.remindersEnabled}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="remindersEnabled" className="toggle-label"></label>
                </div>
              </div>

              {/* Reminder Frequency Dropdown */}
              <div className="preference-item">
                <div className="preference-info">
                  <label htmlFor="reminderFrequency">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Reminder Frequency
                  </label>
                  <p>How often you want to receive reminders</p>
                </div>
                <select
                  id="reminderFrequency"
                  name="reminderFrequency"
                  value={notificationPreferences.reminderFrequency}
                  onChange={handleNotificationChange}
                  disabled={!notificationPreferences.remindersEnabled}
                >
                  <option value="daily">Daily</option>
                  <option value="every-2-days">Every 2 Days</option>
                  <option value="weekly">Weekly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {/* Preferred Reminder Timing */}
              <div className="preference-item">
                <div className="preference-info">
                  <label htmlFor="preferredTiming">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Preferred Timing
                  </label>
                  <p>When you prefer to receive reminders</p>
                </div>
                <select
                  id="preferredTiming"
                  name="preferredTiming"
                  value={notificationPreferences.preferredTiming}
                  onChange={handleNotificationChange}
                  disabled={!notificationPreferences.remindersEnabled}
                >
                  <option value="morning">Morning (8 AM)</option>
                  <option value="afternoon">Afternoon (12 PM)</option>
                  <option value="evening">Evening (6 PM)</option>
                  <option value="night">Night (9 PM)</option>
                </select>
              </div>

              {/* Study Focus Mode Toggle */}
              <div className="preference-item">
                <div className="preference-info">
                  <label htmlFor="studyFocusMode">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Study Focus Mode
                  </label>
                  <p>Reduce notifications during study hours</p>
                </div>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="studyFocusMode"
                    name="studyFocusMode"
                    checked={notificationPreferences.studyFocusMode}
                    onChange={handleNotificationChange}
                    disabled={!notificationPreferences.remindersEnabled}
                  />
                  <label htmlFor="studyFocusMode" className="toggle-label"></label>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Saving Profile...
              </>
            ) : (
              <>
                Save & Continue
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default StudentProfile