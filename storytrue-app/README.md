# StoryTrue - Multiplayer Trivia Game

StoryTrue is an online multiplayer trivia application where players compete to identify which improbable or surprising stories are true versus fabricated. The game leverages AI-generated content to create engaging, fact-based trivia experiences.

## Features

- **Multiplayer Gameplay**: Up to 8 players can join a game session
- **AI-Generated Stories**: Dynamic content powered by ClaudeCode API
- **Real-time Synchronization**: Live updates across all players
- **Responsive Design**: Optimized for both mobile and desktop
- **Topic Customization**: Choose from predefined topics or add custom ones
- **Scoring System**: Points awarded for correct answers with time bonuses

## Tech Stack

- **Frontend**: React 18 with Vite
- **UI Framework**: Chakra UI
- **State Management**: React Context API + useReducer
- **Real-time**: Socket.io or Firebase Realtime Database
- **Testing**: Vitest + React Testing Library
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

4. Fill in your API keys and configuration in `.env.local`

5. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Environment Variables

See `.env.example` for all available environment variables. Key variables include:

- `VITE_CLAUDE_API_KEY` - Your ClaudeCode API key
- `VITE_FIREBASE_*` - Firebase configuration (if using Firebase)
- `VITE_WEBSOCKET_URL` - WebSocket server URL (alternative to Firebase)

## Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Reusable UI components
│   ├── game/           # Game-specific components
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── pages/              # Page components
├── services/           # API and external services
├── utils/              # Utility functions
└── __tests__/          # Test files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests and linting
6. Submit a pull request

## License

This project is licensed under the MIT License.
