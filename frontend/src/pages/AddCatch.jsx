import { Container, Title, Stack, Text } from '@mantine/core'

function AddCatch() {
  return (
    <Container size="lg" mx="auto" px="sm">
      <Title order={2} mb="md" ta="left">Add Catch</Title>
      <Stack>
        <Text>This will allow the user to add a new catch to their profile</Text>
      </Stack>
    </Container>
  )
}

export default AddCatch
