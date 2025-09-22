import { Container, Title, Stack, Text, Button } from '@mantine/core'
import CatchCard from '../components/CatchCard.jsx'
import { useEffect, useState } from 'react'
import api from '../api'
import { useAuth } from '../auth/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'


function MyCatches() {
  const [catches, setCatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let active = true
    if (!user) {
      // redirect to login and remember where we came from
      navigate('/login', { state: { from: location.pathname } })
      return () => { active = false }
    }
    setLoading(true)
    api
      .get(`/api/catch/user/${user.id}`)
      .then((res) => {
        if (!active) return
        setCatches(Array.isArray(res.data) ? res.data : [])
      })
      .catch((err) => {
        if (!active) return
        setError(err?.response?.data || err.message || 'Failed to load catches')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [user, navigate, location])

  return (
    <Container size="lg" mx="auto" px="sm">
      <Title order={2} mb="md" ta="left">
        My Catches
      </Title>
      <Stack gap="xl" align="center">

        {catches.length === 0 && !loading && !error ? (
          <Stack align="center" gap="xs" style={{ width: '100%' }}>
            <Text c="dimmed">No catches yet. Log your first catch to get started.</Text>
            <Button variant="light" onClick={() => navigate('/addcatch')}>Log a catch</Button>
          </Stack>
        ) : (
          catches.map((c, i) => (
            <div key={i} style={{ width: '100%', maxWidth: 720 }}>
              <CatchCard {...c} />
            </div>
          ))
        )}

        {catches.map((c, i) => (
          <div key={i} style={{ width: '100%', maxWidth: 720 }}>
            <CatchCard {...c} />
          </div>
        ))}
      </Stack>
      {loading && <Text>Loading...</Text>}
      {error && <Text color="red">{error}</Text>}
    </Container>
  )
}

export default MyCatches