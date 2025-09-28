import { GAME_CONFIG } from './constants';

/**
 * Validates a game invite code
 * @param {string} code - The invite code to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateGameCode = code => {
  if (!code || typeof code !== 'string') {
    return false;
  }

  // Remove whitespace and convert to uppercase
  const cleanCode = code.trim().toUpperCase();

  // Check length and format (alphanumeric)
  const codeRegex = /^[A-Z0-9]{6}$/;
  return (
    codeRegex.test(cleanCode) &&
    cleanCode.length === GAME_CONFIG.INVITE_CODE_LENGTH
  );
};

/**
 * Validates a player name
 * @param {string} name - The player name to validate
 * @returns {object} - { isValid: boolean, error?: string }
 */
export const validatePlayerName = name => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Name is required' };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }

  if (trimmedName.length > 20) {
    return { isValid: false, error: 'Name must be less than 20 characters' };
  }

  // Allow letters, numbers, spaces, and basic punctuation
  const nameRegex = /^[a-zA-Z0-9\s\-_.]+$/;
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, error: 'Name contains invalid characters' };
  }

  return { isValid: true };
};

/**
 * Validates topic selection
 * @param {string[]} topics - Array of selected topics
 * @returns {object} - { isValid: boolean, error?: string }
 */
export const validateTopicSelection = topics => {
  if (!Array.isArray(topics)) {
    return { isValid: false, error: 'Topics must be an array' };
  }

  if (topics.length === 0) {
    return { isValid: false, error: 'At least one topic must be selected' };
  }

  if (topics.length > 5) {
    return { isValid: false, error: 'Maximum 5 topics can be selected' };
  }

  // Validate each topic
  for (const topic of topics) {
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return { isValid: false, error: 'All topics must be valid strings' };
    }

    if (topic.trim().length > 50) {
      return {
        isValid: false,
        error: 'Topic names must be less than 50 characters',
      };
    }
  }

  return { isValid: true };
};

/**
 * Sanitizes user input to prevent XSS
 * @param {string} input - The input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = input => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 100); // Limit length
};
