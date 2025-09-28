import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateGameCode,
  calculateScore,
  sortPlayersByScore,
  isPlayerLeading,
  generateAvatarColor,
  formatTimeRemaining,
  canStartGame,
  createPlayer,
  updatePlayerActivity,
  calculateRecommendedRounds,
  shouldEndGame,
  getNextRound,
  calculateGameProgress,
  determineWinners,
  canStartRound,
} from '../../utils/gameLogic.js';
import { GAME_CONFIG } from '../../utils/constants.js';

describe('gameLogic utilities', () => {
  describe('generateGameCode', () => {
    it('should generate a 6-character alphanumeric code', () => {
      const code = generateGameCode();
      expect(code).toHaveLength(GAME_CONFIG.INVITE_CODE_LENGTH);
      expect(code).toMatch(/^[A-Z0-9]{6}$/);
    });

    it('should generate unique codes', () => {
      const codes = new Set();
      for (let i = 0; i < 100; i++) {
        codes.add(generateGameCode());
      }
      expect(codes.size).toBeGreaterThan(90); // Should be mostly unique
    });
  });

  describe('calculateScore', () => {
    it('should return base points when no time bonus', () => {
      const score = calculateScore(0, 60);
      expect(score).toBe(GAME_CONFIG.POINTS_PER_CORRECT_ANSWER);
    });

    it('should add time bonus for faster answers', () => {
      const score = calculateScore(30, 60); // Half time remaining
      expect(score).toBeGreaterThan(GAME_CONFIG.POINTS_PER_CORRECT_ANSWER);
    });

    it('should handle edge cases', () => {
      expect(calculateScore(-5, 60)).toBe(GAME_CONFIG.POINTS_PER_CORRECT_ANSWER);
      expect(calculateScore(70, 60)).toBe(GAME_CONFIG.POINTS_PER_CORRECT_ANSWER + 5); // Max bonus
    });
  });

  describe('sortPlayersByScore', () => {
    const players = [
      { id: '1', name: 'Alice', score: 30, avatar: 'blue', isHost: false, isConnected: true, joinedAt: 0, lastActivity: 0 },
      { id: '2', name: 'Bob', score: 50, avatar: 'red', isHost: false, isConnected: true, joinedAt: 0, lastActivity: 0 },
      { id: '3', name: 'Charlie', score: 20, avatar: 'green', isHost: false, isConnected: true, joinedAt: 0, lastActivity: 0 },
    ];

    it('should sort players by score in descending order', () => {
      const sorted = sortPlayersByScore(players);
      expect(sorted[0].name).toBe('Bob');
      expect(sorted[1].name).toBe('Alice');
      expect(sorted[2].name).toBe('Charlie');
    });

    it('should not mutate original array', () => {
      const originalOrder = [...players];
      sortPlayersByScore(players);
      expect(players).toEqual(originalOrder);
    });
  });

  describe('isPlayerLeading', () => {
    const players = [
      { id: '1', name: 'Alice', score: 30, avatar: 'blue', isHost: false, isConnected: true, joinedAt: 0, lastActivity: 0 },
      { id: '2', name: 'Bob', score: 50, avatar: 'red', isHost: false, isConnected: true, joinedAt: 0, lastActivity: 0 },
    ];

    it('should identify the leading player', () => {
      expect(isPlayerLeading(players[1], players)).toBe(true);
      expect(isPlayerLeading(players[0], players)).toBe(false);
    });
  });

  describe('generateAvatarColor', () => {
    it('should return a valid color scheme', () => {
      const validColors = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'];
      const color = generateAvatarColor();
      expect(validColors).toContain(color);
    });
  });

  describe('formatTimeRemaining', () => {
    it('should format time correctly', () => {
      expect(formatTimeRemaining(65)).toBe('1:05');
      expect(formatTimeRemaining(30)).toBe('0:30');
      expect(formatTimeRemaining(0)).toBe('0:00');
      expect(formatTimeRemaining(-5)).toBe('0:00');
    });
  });

  describe('canStartGame', () => {
    const players = [
      { id: 'host', name: 'Host', score: 0, avatar: 'blue', isHost: true, isConnected: true, joinedAt: 0, lastActivity: 0 },
      { id: 'player1', name: 'Player1', score: 0, avatar: 'red', isHost: false, isConnected: true, joinedAt: 0, lastActivity: 0 },
    ];

    it('should allow host to start game with enough players', () => {
      const result = canStartGame(players, 'host', 'host');
      expect(result.canStart).toBe(true);
    });

    it('should prevent non-host from starting game', () => {
      const result = canStartGame(players, 'host', 'player1');
      expect(result.canStart).toBe(false);
      expect(result.reason).toContain('host');
    });

    it('should prevent starting with insufficient players', () => {
      const singlePlayer = [players[0]];
      const result = canStartGame(singlePlayer, 'host', 'host');
      expect(result.canStart).toBe(false);
      expect(result.reason).toContain('2 players');
    });
  });

  describe('createPlayer', () => {
    it('should create a player with correct properties', () => {
      const player = createPlayer('123', 'TestPlayer', true);
      expect(player.id).toBe('123');
      expect(player.name).toBe('TestPlayer');
      expect(player.isHost).toBe(true);
      expect(player.score).toBe(0);
      expect(player.isConnected).toBe(true);
      expect(typeof player.joinedAt).toBe('number');
      expect(typeof player.lastActivity).toBe('number');
    });

    it('should trim player name', () => {
      const player = createPlayer('123', '  TestPlayer  ');
      expect(player.name).toBe('TestPlayer');
    });
  });

  describe('calculateRecommendedRounds', () => {
    it('should return appropriate rounds for different player counts', () => {
      expect(calculateRecommendedRounds(2)).toBe(5);
      expect(calculateRecommendedRounds(4)).toBe(7);
      expect(calculateRecommendedRounds(6)).toBe(8);
      expect(calculateRecommendedRounds(8)).toBe(GAME_CONFIG.MAX_ROUNDS);
    });
  });

  describe('shouldEndGame', () => {
    it('should determine when game should end', () => {
      expect(shouldEndGame(5, 5)).toBe(true);
      expect(shouldEndGame(6, 5)).toBe(true);
      expect(shouldEndGame(4, 5)).toBe(false);
    });
  });

  describe('getNextRound', () => {
    it('should increment round number', () => {
      expect(getNextRound(1)).toBe(2);
      expect(getNextRound(5)).toBe(6);
    });
  });

  describe('calculateGameProgress', () => {
    it('should calculate progress percentage', () => {
      expect(calculateGameProgress(2, 10)).toBe(20);
      expect(calculateGameProgress(5, 10)).toBe(50);
      expect(calculateGameProgress(10, 10)).toBe(100);
      expect(calculateGameProgress(12, 10)).toBe(100); // Should cap at 100
    });
  });

  describe('determineWinners', () => {
    const players = [
      { id: '1', name: 'Alice', score: 50, avatar: 'blue', isHost: false, isConnected: true, joinedAt: 0, lastActivity: 0 },
      { id: '2', name: 'Bob', score: 50, avatar: 'red', isHost: false, isConnected: true, joinedAt: 0, lastActivity: 0 },
      { id: '3', name: 'Charlie', score: 30, avatar: 'green', isHost: false, isConnected: true, joinedAt: 0, lastActivity: 0 },
    ];

    it('should handle ties correctly', () => {
      const result = determineWinners(players);
      expect(result.winners).toHaveLength(2);
      expect(result.highScore).toBe(50);
      expect(result.winners.map(w => w.name)).toEqual(['Alice', 'Bob']);
    });

    it('should handle empty player array', () => {
      const result = determineWinners([]);
      expect(result.winners).toHaveLength(0);
      expect(result.highScore).toBe(0);
    });
  });

  describe('canStartRound', () => {
    const players = [
      { id: '1', name: 'Alice', score: 0, avatar: 'blue', isHost: false, isConnected: true, joinedAt: 0, lastActivity: 0 },
      { id: '2', name: 'Bob', score: 0, avatar: 'red', isHost: false, isConnected: true, joinedAt: 0, lastActivity: 0 },
    ];

    it('should allow round to start with valid conditions', () => {
      const result = canStartRound(players, 1, 5);
      expect(result.canStart).toBe(true);
    });

    it('should prevent round when game should end', () => {
      const result = canStartRound(players, 5, 5);
      expect(result.canStart).toBe(false);
      expect(result.reason).toContain('maximum rounds');
    });

    it('should prevent round with insufficient connected players', () => {
      const disconnectedPlayers = players.map(p => ({ ...p, isConnected: false }));
      const result = canStartRound(disconnectedPlayers, 1, 5);
      expect(result.canStart).toBe(false);
      expect(result.reason).toContain('connected players');
    });
  });
});