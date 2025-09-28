# StoryTrue Type Definitions

This directory contains TypeScript interfaces and JSDoc type definitions for the StoryTrue multiplayer trivia game.

## Files

### `index.ts`
Complete TypeScript interface definitions for all core data models:
- `Player` - Game participant with score, connection status, and metadata
- `Story` - Trivia story with truth value and explanation
- `GameSession` - Complete game state including players, rounds, and settings
- `GameState` - Client-side game state management
- `GameSettings` - Configurable game parameters
- `RoundResult` - Results from completed rounds
- `ValidationResult` - Validation function return type
- `ClaudeAPIResponse` - API response structure
- `GameAction` - Redux-style action types for state management
- `SocketEvents` - WebSocket event definitions

### `jsdoc.js`
JSDoc type definitions that provide IDE intellisense for JavaScript files:
- Mirrors the TypeScript interfaces using JSDoc syntax
- Enables type checking and autocomplete in JavaScript
- Compatible with VS Code and other editors

## Usage

### In TypeScript files:
```typescript
import type { Player, GameSession, Story } from '../types/index.js';
```

### In JavaScript files:
```javascript
/**
 * @typedef {import('../types/jsdoc.js').Player} Player
 */

/**
 * @param {Player} player
 * @returns {boolean}
 */
function isPlayerActive(player) {
  return player.isConnected;
}
```

## Type Safety

The type definitions ensure:
- Consistent data structures across the application
- Better IDE support with autocomplete and error detection
- Clear documentation of expected data shapes
- Easier refactoring and maintenance

## Requirements Coverage

These type definitions satisfy the following task requirements:
- ✅ Create TypeScript interfaces for Player, GameSession, Story, and GameState
- ✅ Support validation functions for game codes, player names, and topic selections
- ✅ Include game configuration constants with proper typing
- ✅ Enable utility functions for game logic with type safety