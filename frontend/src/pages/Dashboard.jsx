import { Container, Title, Stack, Text } from '@mantine/core'

function Dashboard() {
  return (
    <Container size="lg" mx="auto" px="sm">
      <Title order={2} mb="md" ta="left">Dashboard</Title>
      <Stack>
        <Text>This will show the user's fishing statistics and recent catches</Text>
      </Stack>
    </Container>
  )
}

export default Dashboard
