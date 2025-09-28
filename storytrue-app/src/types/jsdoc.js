/**
 * @fileoverview JSDoc type definitions for StoryTrue multiplayer trivia game
 * This file provides type definitions for better IDE support and documentation
 */

/**
 * @typedef {Object} Player
 * @property {string} id - Unique player identifier
 * @property {string} name - Player's display name
 * @property {string} avatar - Avatar color scheme
 * @property {number} score - Current player score
 * @property {boolean} isHost - Whether this player is the game host
 * @property {boolean} isConnected - Connection status
 * @property {boolean} [currentAnswer] - Player's current answer (true/false)
 * @property {number} joinedAt - Timestamp when player joined
 * @property {number} lastActivity - Timestamp of last activity
 */

/**
 * @typedef {Object} Story
 * @property {string} id - Unique story identifier
 * @property {string} text - The story text
 * @property {boolean} isTrue - Whether the story is true or false
 * @property {string} explanation - Explanation of why the story is true/false
 * @property {string} topic - Story topic/category
 * @property {'easy'|'medium'|'hard'} difficulty - Story difficulty level
 * @property {string} [source] - Source of the story
 * @property {number} generatedAt - Timestamp when story was generated
 */

/**
 * @typedef {Object} GameSession
 * @property {string} id - Unique game session identifier
 * @property {string} code - 6-character invite code
 * @property {string} hostId - ID of the game host
 * @property {string[]} topics - Selected topics for the game
 * @property {Player[]} players - Array of players in the game
 * @property {number} currentRound - Current round number
 * @property {number} maxRounds - Maximum rounds for this game
 * @property {'waiting'|'lobby'|'playing'|'results'|'finished'} phase - Current game phase
 * @property {Story} [currentStory] - Current story being played
 * @property {number} [roundStartTime] - Timestamp when current round started
 * @property {number} createdAt - Timestamp when game was created
 * @property {number} updatedAt - Timestamp when game was last updated
 * @property {GameSettings} settings - Game configuration settings
 */

/**
 * @typedef {Object} GameState
 * @property {GameSession|null} session - Current game session
 * @property {Player|null} currentPlayer - Current player
 * @property {boolean} isLoading - Loading state
 * @property {string|null} error - Current error message
 * @property {'connected'|'disconnected'|'reconnecting'|'error'} connectionStatus - Connection status
 * @property {number} roundTimer - Time remaining in current round
 * @property {Object.<string, boolean>} playerAnswers - Player answers for current round
 * @property {RoundResult} [roundResults] - Results of the current round
 */

/**
 * @typedef {Object} GameSettings
 * @property {number} maxPlayers - Maximum number of players
 * @property {number} roundDuration - Duration of each round in seconds
 * @property {number} pointsPerCorrectAnswer - Points awarded for correct answers
 * @property {boolean} allowCustomTopics - Whether custom topics are allowed
 * @property {boolean} requireAllPlayersToAnswer - Whether all players must answer
 */

/**
 * @typedef {Object} RoundResult
 * @property {Story} story - The story that was played
 * @property {boolean} correctAnswer - The correct answer
 * @property {Object.<string, boolean>} playerAnswers - All player answers
 * @property {Object.<string, number>} scores - Updated player scores
 * @property {number} roundNumber - Round number
 * @property {number} completedAt - Timestamp when round completed
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether the validation passed
 * @property {string} [error] - Error message if validation failed
 */

/**
 * @typedef {Object} ClaudeAPIResponse
 * @property {string} story - Generated story text
 * @property {boolean} isTrue - Whether the story is true
 * @property {string} explanation - Explanation of the story
 * @property {string} topic - Story topic
 * @property {'easy'|'medium'|'hard'} difficulty - Story difficulty
 * @property {number} confidence - AI confidence in the story
 */

/**
 * @typedef {Object} GameConfig
 * @property {number} MAX_PLAYERS - Maximum players allowed
 * @property {number} MIN_PLAYERS - Minimum players required
 * @property {number} ROUND_DURATION - Round duration in seconds
 * @property {number} POINTS_PER_CORRECT_ANSWER - Points per correct answer
 * @property {number} INVITE_CODE_LENGTH - Length of invite codes
 * @property {number} MAX_ROUNDS - Maximum rounds per game
 * @property {number} DEFAULT_ROUNDS - Default number of rounds
 */

/**
 * @typedef {Object} APIEndpoints
 * @property {string} CLAUDE_API - ClaudeCode API endpoint
 * @property {string} WEBSOCKET - WebSocket server endpoint
 */

// Export empty object to make this a module
export {};