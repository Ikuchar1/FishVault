import { useState } from 'react'
import { Button, Container, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const from = location.state?.from || '/mycatches'

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size={420} mx="auto">
      <Title order={2} ta="center" mb="md">Login</Title>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.currentTarget.value)} required />
          <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} required />
          <Button type="submit" loading={loading}>Sign in</Button>
          <Text size="sm" c="dimmed">
            No account? <Text component={Link} to="/register" span fw={600}>Create one</Text>
          </Text>
        </Stack>
      </form>
    </Container>
  )
}
