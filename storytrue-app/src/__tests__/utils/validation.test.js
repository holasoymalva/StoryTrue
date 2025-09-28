import { describe, it, expect } from 'vitest';
import {
  validateGameCode,
  validatePlayerName,
  validateTopicSelection,
} from '../../utils/validation';

describe('validation utilities', () => {
  describe('validateGameCode', () => {
    it('should validate correct game codes', () => {
      expect(validateGameCode('ABC123')).toBe(true);
      expect(validateGameCode('XYZ789')).toBe(true);
    });

    it('should reject invalid game codes', () => {
      expect(validateGameCode('')).toBe(false);
      expect(validateGameCode('ABC12')).toBe(false); // too short
      expect(validateGameCode('ABC1234')).toBe(false); // too long
      expect(validateGameCode('ABC-12')).toBe(false); // invalid character
      expect(validateGameCode(null)).toBe(false);
      expect(validateGameCode(undefined)).toBe(false);
    });
  });

  describe('validatePlayerName', () => {
    it('should validate correct player names', () => {
      expect(validatePlayerName('John')).toEqual({ isValid: true });
      expect(validatePlayerName('Player123')).toEqual({ isValid: true });
      expect(validatePlayerName('Test User')).toEqual({ isValid: true });
    });

    it('should reject invalid player names', () => {
      expect(validatePlayerName('')).toEqual({
        isValid: false,
        error: 'Name is required',
      });
      expect(validatePlayerName('A')).toEqual({
        isValid: false,
        error: 'Name must be at least 2 characters long',
      });
      expect(validatePlayerName('A'.repeat(21))).toEqual({
        isValid: false,
        error: 'Name must be less than 20 characters',
      });
    });
  });

  describe('validateTopicSelection', () => {
    it('should validate correct topic selections', () => {
      expect(validateTopicSelection(['History'])).toEqual({ isValid: true });
      expect(validateTopicSelection(['History', 'Science'])).toEqual({
        isValid: true,
      });
    });

    it('should reject invalid topic selections', () => {
      expect(validateTopicSelection([])).toEqual({
        isValid: false,
        error: 'At least one topic must be selected',
      });
      expect(validateTopicSelection(['A', 'B', 'C', 'D', 'E', 'F'])).toEqual({
        isValid: false,
        error: 'Maximum 5 topics can be selected',
      });
    });
  });
});
