import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveUser } from '../utils/storage'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim()) {
      saveUser({ name: username.trim() })
      navigate('/student-profile')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <h1 className="login-title">Duenza</h1>
          <p className="login-subtitle">Your Assignment Deadline Manager</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">What's your name?</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              autoFocus
            />
          </div>
          
          <button type="submit" className="login-btn" disabled={!username.trim()}>
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>

        <div className="login-footer">
          <p>Streamline your academic workflow</p>
        </div>
      </div>
    </div>
  )
}

export default Login