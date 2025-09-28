import { GAME_CONFIG } from './constants';

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

  // Bonus points for faster answers (up to 50% bonus)
  const timeBonus = Math.floor(
    (timeRemaining / totalTime) * (basePoints * 0.5)
  );

  return basePoints + timeBonus;
};

/**
 * Sorts players by score (descending)
 * @param {Array} players - Array of player objects
 * @returns {Array} - Sorted array of players
 */
export const sortPlayersByScore = players => {
  return [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
};

/**
 * Determines if a player is the current leader
 * @param {Object} player - Player object
 * @param {Array} allPlayers - Array of all players
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
 * @param {Array} players - Array of players
 * @param {string} hostId - ID of the game host
 * @param {string} currentPlayerId - ID of the current player
 * @returns {object} - { canStart: boolean, reason?: string }
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
