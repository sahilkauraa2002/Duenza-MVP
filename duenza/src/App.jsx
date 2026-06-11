import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import StudentProfile from './pages/StudentProfile'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import AddTask from './pages/AddTask'
import Confirmation from './pages/Confirmation'
import Reminders from './pages/Reminders'
import Ethics from './pages/Ethics'
import Calendar from './pages/Calendar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/ethics" element={<Ethics />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  )
}

export default App