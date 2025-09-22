import { useEffect, useMemo, useState } from 'react'
import { notifications } from '@mantine/notifications'
import api from '../api'
import { AuthContext } from './context'


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('fv:user')
      if (raw) setUser(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to parse stored user', e)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const res = await api.post('/api/users/login', { email, password })
      const u = res.data
      setUser(u)
      localStorage.setItem('fv:user', JSON.stringify(u))
      notifications.show({ title: 'Welcome back', message: `Logged in as ${u.name || u.email}`, color: 'green' })
      return u
    } catch (err) {
      const msg = err?.response?.data || 'Login failed'
      notifications.show({ title: 'Login error', message: String(msg), color: 'red' })
      throw err
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fv:user')
    notifications.show({ title: 'Logged out', message: 'You have been logged out.', color: 'gray' })
  }

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Note: useAuth hook is exported from ./useAuth.js to keep this file exporting only components
