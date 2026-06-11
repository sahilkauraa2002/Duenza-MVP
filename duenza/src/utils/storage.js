const TASKS_KEY = 'duenza_tasks'
const USER_KEY = 'duenza_user'
const STUDENT_PROFILE_KEY = 'duenza_student_profile'
const NOTIFICATION_PREFERENCES_KEY = 'duenza_notification_preferences'

export const getTasks = () => {
  const tasks = localStorage.getItem(TASKS_KEY)
  return tasks ? JSON.parse(tasks) : []
}

export const saveTask = (task) => {
  const tasks = getTasks()
  const newTask = {
    ...task,
    id: Date.now(),
    createdAt: new Date().toISOString()
  }
  tasks.push(newTask)
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  return newTask
}

export const deleteTask = (taskId) => {
  const tasks = getTasks()
  const filteredTasks = tasks.filter(task => task.id !== taskId)
  localStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks))
}

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const clearUser = () => {
  localStorage.removeItem(USER_KEY)
}

export const getStudentProfile = () => {
  const profile = localStorage.getItem(STUDENT_PROFILE_KEY)
  return profile ? JSON.parse(profile) : null
}

export const saveStudentProfile = (profile) => {
  localStorage.setItem(STUDENT_PROFILE_KEY, JSON.stringify(profile))
}

export const clearStudentProfile = () => {
  localStorage.removeItem(STUDENT_PROFILE_KEY)
}

export const getUrgentTasks = () => {
  const tasks = getTasks()
  const now = new Date()
  const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
  
  return tasks.filter(task => {
    const deadline = new Date(task.deadline)
    return deadline <= twoDaysFromNow && deadline >= now
  })
}

export const getOverdueTasks = () => {
  const tasks = getTasks()
  const now = new Date()
  
  return tasks.filter(task => {
    const deadline = new Date(task.deadline)
    return deadline < now
  })
}

export const sortTasksByDeadline = (tasks) => {
  return [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
}

// Notification Preferences Functions
export const getNotificationPreferences = () => {
  const preferences = localStorage.getItem(NOTIFICATION_PREFERENCES_KEY)
  return preferences ? JSON.parse(preferences) : {
    remindersEnabled: true,
    reminderFrequency: 'daily',
    preferredTiming: 'morning',
    studyFocusMode: false
  }
}

export const saveNotificationPreferences = (preferences) => {
  localStorage.setItem(NOTIFICATION_PREFERENCES_KEY, JSON.stringify(preferences))
}

export const clearNotificationPreferences = () => {
  localStorage.removeItem(NOTIFICATION_PREFERENCES_KEY)
}