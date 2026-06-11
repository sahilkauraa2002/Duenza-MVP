import { useNavigate } from 'react-router-dom'
import './Ethics.css'

function Ethics() {
  const navigate = useNavigate()

  return (
    <div className="ethics-container">
      <div className="ethics-card">
        <header className="ethics-header">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div className="header-content">
            <div className="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h1>Ethics & Privacy</h1>
            <p>Your privacy and data security are our top priorities</p>
          </div>
        </header>

        <div className="ethics-content">
          <section className="ethics-section">
            <div className="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div className="section-content">
              <h2>Local Data Storage</h2>
              <p>All your data is stored locally on your device using browser localStorage. Nothing is sent to external servers or cloud services. Your academic information stays completely private and under your control.</p>
            </div>
          </section>

          <section className="ethics-section">
            <div className="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="section-content">
              <h2>No Third-Party Sharing</h2>
              <p>We do not share, sell, or transmit your data to any third parties. There are no analytics trackers, advertising networks, or external services that have access to your information. Your data is yours alone.</p>
            </div>
          </section>

          <section className="ethics-section">
            <div className="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="section-content">
              <h2>Minimal Data Collection</h2>
              <p>We collect only the essential academic data you provide: task names, deadlines, subjects, and priority levels. No personal identifiers, browsing history, or unnecessary information is collected or stored.</p>
            </div>
          </section>

          <section className="ethics-section">
            <div className="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </div>
            <div className="section-content">
              <h2>Complete Data Control</h2>
              <p>You have full control over your data. Delete individual tasks anytime, or clear all data completely. When you delete information, it's permanently removed from your device with no backup or recovery possible.</p>
            </div>
          </section>

          <section className="ethics-section">
            <div className="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div className="section-content">
              <h2>Transparent Practices</h2>
              <p>We believe in complete transparency. This page clearly explains what data we collect, how it's stored, and your rights. There are no hidden terms, secret data collection, or unclear privacy practices.</p>
            </div>
          </section>

          <section className="ethics-section">
            <div className="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </div>
            <div className="section-content">
              <h2>Ethical Commitment</h2>
              <p>Duenza is built with ethical principles at its core. We prioritize student privacy, data security, and responsible technology use. Our goal is to help you succeed academically while respecting your digital rights.</p>
            </div>
          </section>
        </div>

        <div className="ethics-footer">
          <div className="footer-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <p>Your privacy is protected. Your data stays with you.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ethics