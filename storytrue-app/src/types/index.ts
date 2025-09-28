// Core TypeScript interfaces for StoryTrue multiplayer trivia game

/**
 * Player interface representing a game participant
 */
export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  isHost: boolean;
  isConnected: boolean;
  currentAnswer?: boolean;
  joinedAt: number;
  lastActivity: number;
}

/**
 * Story interface for trivia questions
 */
export interface Story {
  id: string;
  text: string;
  isTrue: boolean;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  source?: string;
  generatedAt: number;
}

/**
 * Game session interface
 */
export interface GameSession {
  id: string;
  code: string;
  hostId: string;
  topics: string[];
  players: Player[];
  currentRound: number;
  maxRounds: number;
  phase: GamePhase;
  currentStory?: Story;
  roundStartTime?: number;
  createdAt: number;
  updatedAt: number;
  settings: GameSettings;
}

/**
 * Game state interface for managing current game status
 */
export interface GameState {
  session: GameSession | null;
  currentPlayer: Player | null;
  isLoading: boolean;
  error: string | null;
  connectionStatus: ConnectionStatus;
  roundTimer: number;
  playerAnswers: Record<string, boolean>;
  roundResults?: RoundResult;
}

/**
 * Game settings interface
 */
export interface GameSettings {
  maxPlayers: number;
  roundDuration: number;
  pointsPerCorrectAnswer: number;
  allowCustomTopics: boolean;
  requireAllPlayersToAnswer: boolean;
}

/**
 * Round result interface
 */
export interface RoundResult {
  story: Story;
  correctAnswer: boolean;
  playerAnswers: Record<string, boolean>;
  scores: Record<string, number>;
  roundNumber: number;
  completedAt: number;
}

/**
 * Game phase enum
 */
export type GamePhase = 'waiting' | 'lobby' | 'playing' | 'results' | 'finished';

/**
 * Connection status enum
 */
export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting' | 'error';

/**
 * Player status enum
 */
export type PlayerStatus = 'connected' | 'disconnected' | 'reconnecting';

/**
 * Story difficulty enum
 */
export type StoryDifficulty = 'easy' | 'medium' | 'hard';

/**
 * API response interface for ClaudeCode API
 */
export interface ClaudeAPIResponse {
  story: string;
  isTrue: boolean;
  explanation: string;
  topic: string;
  difficulty: StoryDifficulty;
  confidence: number;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Game action types for state management
 */
export type GameAction =
  | { type: 'CREATE_GAME'; payload: { topics: string[]; hostPlayer: Player } }
  | { type: 'JOIN_GAME'; payload: { gameCode: string; player: Player } }
  | { type: 'START_GAME' }
  | { type: 'NEXT_ROUND'; payload: { story: Story } }
  | { type: 'SUBMIT_ANSWER'; payload: { playerId: string; answer: boolean } }
  | { type: 'ROUND_COMPLETE'; payload: RoundResult }
  | { type: 'PLAYER_JOINED'; payload: Player }
  | { type: 'PLAYER_LEFT'; payload: string }
  | { type: 'UPDATE_CONNECTION'; payload: ConnectionStatus }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_TIMER'; payload: number }
  | { type: 'GAME_FINISHED'; payload: { finalScores: Record<string, number> } };

/**
 * Socket event types for real-time communication
 */
export interface SocketEvents {
  // Client to server events
  'create-game': (data: { topics: string[]; hostPlayer: Player }) => void;
  'join-game': (data: { gameCode: string; player: Player }) => void;
  'start-game': (gameId: string) => void;
  'submit-answer': (data: { gameId: string; playerId: string; answer: boolean }) => void;
  'leave-game': (data: { gameId: string; playerId: string }) => void;

  // Server to client events
  'game-created': (data: { gameSession: GameSession }) => void;
  'player-joined': (data: { player: Player; gameSession: GameSession }) => void;
  'game-started': (data: { story: Story }) => void;
  'round-complete': (data: RoundResult) => void;
  'game-finished': (data: { finalScores: Record<string, number> }) => void;
  'player-left': (data: { playerId: string }) => void;
  'error': (data: { message: string; code?: string }) => void;
  'connection-status': (data: { status: ConnectionStatus }) => void;
}

/**
 * Game configuration interface
 */
export interface GameConfig {
  MAX_PLAYERS: number;
  MIN_PLAYERS: number;
  ROUND_DURATION: number;
  POINTS_PER_CORRECT_ANSWER: number;
  INVITE_CODE_LENGTH: number;
  MAX_ROUNDS: number;
  DEFAULT_ROUNDS: number;
}

/**
 * API endpoints configuration
 */
export interface APIEndpoints {
  CLAUDE_API: string;
  WEBSOCKET: string;
}

/**
 * Error and success message types
 */
export interface Messages {
  ERROR_MESSAGES: Record<string, string>;
  SUCCESS_MESSAGES: Record<string, string>;
}