import { Card, Text, Button, Group, Title, Stack } from '@mantine/core'
import { useAuth } from '../auth/useAuth'
import { Link } from 'react-router-dom'

function Profile() {
  const { user } = useAuth()
  return (
    <div>
      <Title order={2} mb="md">Profile</Title>
      {!user && (
        <Text>
          You are not logged in. <Button component={Link} to="/login" variant="light" ml="xs">Login</Button>
        </Text>
      )}
    </div>
  )
}

export default Profile
