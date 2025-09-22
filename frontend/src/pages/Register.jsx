import { useState } from 'react'
import { Button, Container, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { notifications } from '@mantine/notifications'
// import { useAuth } from '../auth/useAuth'

export default function Register() {
  const navigate = useNavigate()
  // const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/api/users/register', { name, email, password })
      notifications.show({ title: 'Account created', message: 'You can now log in.', color: 'green' })
      // Optionally auto-login: await login(email, password)
      navigate('/login', { replace: true })
    } catch (err) {
      const msg = err?.response?.data || 'Registration failed'
      notifications.show({ title: 'Registration error', message: String(msg), color: 'red' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size={480} mx="auto">
      <Title order={2} ta="center" mb="md">Create an account</Title>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput label="Name" placeholder="Your full name" value={name} onChange={(e) => setName(e.currentTarget.value)} required />
          <TextInput label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.currentTarget.value)} required />
          <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} required />
          <Button type="submit" loading={loading}>Create account</Button>
          <Text size="sm" c="dimmed">
            Already have an account? <Text component={Link} to="/login" span fw={600}>Log in</Text>
          </Text>
        </Stack>
      </form>
    </Container>
  )
}
