import { GAME_CONFIG } from './constants.js';

/**
 * @typedef {import('../types/jsdoc.js').Player} Player
 */

/**
 * Generates a random game invite code
 * @returns {string} - 6-character alphanumeric code
 */
export const generateGameCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < GAME_CONFIG.INVITE_CODE_LENGTH; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

/**
 * Calculates score for a correct answer
 * @param {number} timeRemaining - Time remaining when answer was submitted (in seconds)
 * @param {number} totalTime - Total time allowed for the question
 * @returns {number} - Points awarded
 */
export const calculateScore = (
  timeRemaining = 0,
  totalTime = GAME_CONFIG.ROUND_DURATION
) => {
  const basePoints = GAME_CONFIG.POINTS_PER_CORRECT_ANSWER;

  // Ensure timeRemaining is not negative
  const validTimeRemaining = Math.max(0, timeRemaining);

  // Bonus points for faster answers (up to 50% bonus)
  const timeBonus = Math.floor(
    (validTimeRemaining / totalTime) * (basePoints * 0.5)
  );

  return basePoints + timeBonus;
};

/**
 * Sorts players by score (descending)
 * @param {Player[]} players - Array of player objects
 * @returns {Player[]} - Sorted array of players
 */
export const sortPlayersByScore = players => {
  return [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
};

/**
 * Determines if a player is the current leader
 * @param {Player} player - Player object
 * @param {Player[]} allPlayers - Array of all players
 * @returns {boolean} - True if player is leading
 */
export const isPlayerLeading = (player, allPlayers) => {
  const sortedPlayers = sortPlayersByScore(allPlayers);
  return sortedPlayers.length > 0 && sortedPlayers[0].id === player.id;
};

/**
 * Generates a random avatar color
 * @returns {string} - Chakra UI color scheme name
 */
export const generateAvatarColor = () => {
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'pink',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Creates a shareable game URL
 * @param {string} gameCode - The game invite code
 * @returns {string} - Full URL to join the game
 */
export const createShareableUrl = gameCode => {
  const baseUrl = window.location.origin + import.meta.env.VITE_BASE_URL;
  return `${baseUrl}join/${gameCode}`;
};

/**
 * Formats time remaining for display
 * @param {number} seconds - Seconds remaining
 * @returns {string} - Formatted time string
 */
export const formatTimeRemaining = seconds => {
  if (seconds <= 0) return '0:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Checks if game can start
 * @param {Player[]} players - Array of players
 * @param {string} hostId - ID of the game host
 * @param {string} currentPlayerId - ID of the current player
 * @returns {{ canStart: boolean; reason?: string }} - Result object
 */
export const canStartGame = (players, hostId, currentPlayerId) => {
  if (currentPlayerId !== hostId) {
    return { canStart: false, reason: 'Only the host can start the game' };
  }

  if (players.length < GAME_CONFIG.MIN_PLAYERS) {
    return {
      canStart: false,
      reason: `Need at least ${GAME_CONFIG.MIN_PLAYERS} players to start`,
    };
  }

  return { canStart: true };
};

/**
 * Creates a new player object with default values
 * @param {string} id - Unique player identifier
 * @param {string} name - Player's display name
 * @param {boolean} [isHost=false] - Whether this player is the game host
 * @returns {Player} - New player object
 */
export const createPlayer = (id, name, isHost = false) => {
  return {
    id,
    name: name.trim(),
    avatar: generateAvatarColor(),
    score: 0,
    isHost,
    isConnected: true,
    joinedAt: Date.now(),
    lastActivity: Date.now(),
  };
};

/**
 * Updates player's last activity timestamp
 * @param {Player} player - Player to update
 * @returns {Player} - Updated player object
 */
export const updatePlayerActivity = player => {
  return {
    ...player,
    lastActivity: Date.now(),
  };
};

/**
 * Calculates total rounds based on number of players
 * @param {number} playerCount - Number of players in the game
 * @returns {number} - Recommended number of rounds
 */
export const calculateRecommendedRounds = playerCount => {
  // More players = more rounds for better gameplay
  if (playerCount <= 2) return 5;
  if (playerCount <= 4) return 7;
  if (playerCount <= 6) return 8;
  return GAME_CONFIG.MAX_ROUNDS;
};

/**
 * Determines if the game should end based on current round
 * @param {number} currentRound - Current round number
 * @param {number} maxRounds - Maximum rounds for this game
 * @returns {boolean} - True if game should end
 */
export const shouldEndGame = (currentRound, maxRounds) => {
  return currentRound >= maxRounds;
};

/**
 * Gets the next round number
 * @param {number} currentRound - Current round number
 * @returns {number} - Next round number
 */
export const getNextRound = currentRound => {
  return currentRound + 1;
};

/**
 * Calculates game progress as a percentage
 * @param {number} currentRound - Current round number
 * @param {number} maxRounds - Maximum rounds for this game
 * @returns {number} - Progress percentage (0-100)
 */
export const calculateGameProgress = (currentRound, maxRounds) => {
  return Math.min(Math.round((currentRound / maxRounds) * 100), 100);
};

/**
 * Determines winner(s) from final scores
 * @param {Player[]} players - Array of all players
 * @returns {{ winners: Player[], highScore: number }} - Winner information
 */
export const determineWinners = players => {
  if (players.length === 0) {
    return { winners: [], highScore: 0 };
  }

  const sortedPlayers = sortPlayersByScore(players);
  const highScore = sortedPlayers[0].score;
  const winners = sortedPlayers.filter(player => player.score === highScore);

  return { winners, highScore };
};

/**
 * Validates if a round can start
 * @param {Player[]} players - Array of players
 * @param {number} currentRound - Current round number
 * @param {number} maxRounds - Maximum rounds
 * @returns {{ canStart: boolean; reason?: string }} - Validation result
 */
export const canStartRound = (players, currentRound, maxRounds) => {
  if (shouldEndGame(currentRound, maxRounds)) {
    return { canStart: false, reason: 'Game has reached maximum rounds' };
  }

  const connectedPlayers = players.filter(p => p.isConnected);
  if (connectedPlayers.length < GAME_CONFIG.MIN_PLAYERS) {
    return { 
      canStart: false, 
      reason: `Need at least ${GAME_CONFIG.MIN_PLAYERS} connected players` 
    };
  }

  return { canStart: true };
};