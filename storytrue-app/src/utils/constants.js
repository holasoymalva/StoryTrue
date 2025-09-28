// Game Configuration Constants
export const GAME_CONFIG = {
  MAX_PLAYERS: 8,
  MIN_PLAYERS: 2,
  ROUND_DURATION: 60, // seconds
  POINTS_PER_CORRECT_ANSWER: 10,
  INVITE_CODE_LENGTH: 6,
  MAX_ROUNDS: 10,
  DEFAULT_ROUNDS: 5,
};

// Game Phases
export const GAME_PHASES = {
  LOBBY: 'lobby',
  PLAYING: 'playing',
  RESULTS: 'results',
  FINISHED: 'finished',
};

// Player Status
export const PLAYER_STATUS = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  RECONNECTING: 'reconnecting',
};

// API Endpoints
export const API_ENDPOINTS = {
  CLAUDE_API: import.meta.env.VITE_CLAUDE_API_URL || 'https://api.claude.ai/v1',
  WEBSOCKET: import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:3001',
};

// Predefined Topics
export const PREDEFINED_TOPICS = [
  'History',
  'Pop Culture',
  'Science',
  'Sports',
  'Technology',
  'Geography',
  'Literature',
  'Movies & TV',
  'Music',
  'Food & Cooking',
];

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_GAME_CODE: 'Invalid game code. Please check and try again.',
  GAME_FULL: 'This game is full. Maximum 8 players allowed.',
  GAME_NOT_FOUND: 'Game not found. Please check the invite code.',
  CONNECTION_FAILED: 'Failed to connect to the game. Please try again.',
  API_ERROR: 'Unable to generate story. Using fallback content.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  GAME_CREATED: 'Game created successfully!',
  PLAYER_JOINED: 'Successfully joined the game!',
  ANSWER_SUBMITTED: 'Answer submitted!',
  GAME_STARTED: 'Game started! Good luck!',
};
