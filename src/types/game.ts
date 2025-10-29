// -----------------------------------------------------------------------------
// 🐍 Snake Game Type Definitions
// -----------------------------------------------------------------------------
// This file defines all core types, enums, and interfaces used in the Snake game.
// It provides a centralized source of truth for position tracking, game states,
// directions, and multiplayer configurations.
// -----------------------------------------------------------------------------

import { GridSize } from "../utils/constants";

/* -------------------------------------------------------------------------- */
/* 📍 Position Type                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Represents a coordinate on the game grid.
 * `x` → horizontal position
 * `y` → vertical position
 */
export interface Position {
  x: number;
  y: number;
}

/* -------------------------------------------------------------------------- */
/* 🧭 Direction Enum                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Enumerates all possible movement directions for the snake(s).
 */
export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

/* -------------------------------------------------------------------------- */
/* 🎮 Game Status Enum                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Represents the current state of the game loop.
 */
export enum GameStatus {
  /** Game not started yet */
  IDLE = "IDLE",

  /** Game is actively running */
  PLAYING = "PLAYING",

  /** Game is temporarily paused */
  PAUSED = "PAUSED",

  /** Game has ended (player lost) */
  GAME_OVER = "GAME_OVER",
}

/* -------------------------------------------------------------------------- */
/* 👥 Game Mode Enum                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Defines the gameplay mode:
 * - SINGLE → Classic one-player mode
 * - TWO_PLAYER → Dual snake mode for two players
 */
export enum GameMode {
  SINGLE = "SINGLE",
  TWO_PLAYER = "TWO_PLAYER",
}

/* -------------------------------------------------------------------------- */
/* 🧩 Game State Interface                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Represents the full state of the game at any given moment.
 * Tracks positions, scores, directions, and other runtime data.
 */
export interface GameState {
  /** Array of positions representing the main snake’s body segments */
  snake: Position[];

  /** Current position of the food item on the grid */
  food: Position;

  /** Current direction of the main snake */
  direction: Direction;

  /** Player 1’s current score */
  score: number;

  /** Current overall game status (idle, playing, etc.) */
  gameStatus: GameStatus;

  /** Highest score recorded in this session */
  highScore: number;

  /** Grid size setting (e.g., 15, 20, 30) */
  gridSize: GridSize;

  /* ---------------------- Optional Multiplayer Fields ---------------------- */

  /** Second snake’s body segments (used only in two-player mode) */
  snake2?: Position[];

  /** Current direction of the second snake */
  direction2?: Direction;

  /** Player 2’s current score */
  score2?: number;
}
