import { supabase } from '../supabase'

const USER_KEY = 'duenza_user'
const STUDENT_PROFILE_KEY = 'duenza_student_profile'
const NOTIFICATION_PREFERENCES_KEY = 'duenza_notification_preferences'

// ─── Task Functions (Supabase) ───────────────────────────────────────────────

export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('deadline', { ascending: true })

  if (error) {
    console.error('Error fetching tasks:', error)
    return []
  }

  // Map Supabase columns to app field names
  return (data || []).map(task => ({
    id: task.id,
    name: task.task_name,
    subject: task.subject,
    deadline: task.deadline,
    priority: task.priority,
    createdAt: task.created_at
  }))
}

export const saveTask = async (task) => {
  const insertData = {
    task_name: task.name,
    subject: task.subject,
    deadline: task.deadline,
    priority: task.priority
  }

  console.log('Inserting into tasks table:', insertData)

  const { data, error } = await supabase
    .from('tasks')
    .insert([insertData])
    .select()
    .single()

  if (error) {
    console.error('Supabase insert error:', JSON.stringify(error, null, 2))
    throw error
  }

  // Map back to app field names
  return {
    id: data.id,
    name: data.task_name,
    subject: data.subject,
    deadline: data.deadline,
    priority: data.priority,
    createdAt: data.created_at
  }
}

export const deleteTask = async (taskId) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)

  if (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}

export const getUrgentTasks = async () => {
  const tasks = await getTasks()
  const now = new Date()
  const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)

  return tasks.filter(task => {
    const deadline = new Date(task.deadline)
    return deadline <= twoDaysFromNow && deadline >= now
  })
}

export const getOverdueTasks = async () => {
  const tasks = await getTasks()
  const now = new Date()

  return tasks.filter(task => {
    const deadline = new Date(task.deadline)
    return deadline < now
  })
}

export const sortTasksByDeadline = (tasks) => {
  return [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
}

// ─── User Functions (localStorage — unchanged) ──────────────────────────────

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