import { Box, Heading, Text, VStack } from '@chakra-ui/react';

function App() {
  return (
    <Box minH="100vh" bg="gray.50" p={8}>
      <VStack spacing={6} align="center" justify="center" minH="80vh">
        <Heading
          size="2xl"
          bgGradient="linear(to-r, brand.400, brand.600)"
          bgClip="text"
          textAlign="center"
        >
          StoryTrue
        </Heading>
        <Text fontSize="xl" color="gray.600" textAlign="center" maxW="md">
          Multiplayer Trivia Game - Project Structure Setup Complete!
        </Text>
        <Text fontSize="md" color="gray.500" textAlign="center">
          Ready for implementation of game features.
        </Text>
      </VStack>
    </Box>
  );
}

export default App;
