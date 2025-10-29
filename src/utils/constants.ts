/**
 * 🎮 Snake Game Configuration
 * Defines global constants for grid dimensions, visuals, themes, and gameplay settings.
 * Built for smooth performance and easy customization.
 */

/* -------------------------------------------------------------------------- */
/* 🧩 GRID SETTINGS                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Available grid sizes (width × height).
 */
export const GRID_SIZES = {
  /** Compact grid: 15×15 cells (225 total). */
  small: 15,

  /** Standard grid: 20×20 cells (400 total). Default. */
  medium: 20,

  /** Extended grid: 30×30 cells (900 total). */
  large: 30,
} as const;

/**
 * Grid size type: 'small' | 'medium' | 'large'.
 */
export type GridSize = keyof typeof GRID_SIZES;

/**
 * Size (in pixels) of each grid cell.
 * Controls the visual scale of the game.
 */
export const CELL_SIZE = 25;

/**
 * Default grid configuration.
 * Can be changed by player settings.
 */
export const DEFAULT_GRID_SIZE: GridSize = "medium";

/**
 * Active grid dimension based on the current size selection.
 */
export const GRID_SIZE = GRID_SIZES[DEFAULT_GRID_SIZE];

/* -------------------------------------------------------------------------- */
/* 🐍 GAMEPLAY CONSTANTS                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Starting number of snake body segments.
 */
export const INITIAL_SNAKE_LENGTH = 3;

/**
 * Initial game speed (milliseconds per frame).
 * Lower values = faster movement.
 */
export const INITIAL_SPEED = 150;

/* -------------------------------------------------------------------------- */
/* 🎨 COLOR & THEME SETTINGS                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Default color palette (used when no theme is selected).
 */
export const COLORS = {
  background: "#1a1a2e",
  grid: "#16213e",
  snake: "#0f3460",
  snakeHead: "#e94560",
  snake2: "#1abc9c",
  snake2Head: "#16a085",
  food: "#f39c12",
  text: "#ffffff",
};

/**
 * Predefined visual themes.
 * Each theme defines custom colors for different game elements.
 */
export const THEMES = {
  classic: {
    name: "Classic",
    background: "#1a1a2e",
    grid: "#16213e",
    snake: "#0f3460",
    snakeHead: "#e94560",
    snake2: "#1abc9c",
    snake2Head: "#16a085",
    food: "#f39c12",
    text: "#ffffff",
  },

  neon: {
    name: "Neon",
    background: "#000000",
    grid: "#111111",
    snake: "#00ff9d",
    snakeHead: "#ff00ff",
    snake2: "#00b3ff",
    snake2Head: "#ff9900",
    food: "#00ffff",
    text: "#ffffff",
  },

  retro: {
    name: "Retro",
    background: "#2b2b2b",
    grid: "#1e1e1e",
    snake: "#76c893",
    snakeHead: "#f4a261",
    snake2: "#8ecae6",
    snake2Head: "#219ebc",
    food: "#e76f51",
    text: "#e9c46a",
  },

  dark: {
    name: "Dark Mode",
    background: "#0a0a0a",
    grid: "#1a1a1a",
    snake: "#10b981",
    snakeHead: "#f43f5e",
    snake2: "#60a5fa",
    snake2Head: "#3b82f6",
    food: "#facc15",
    text: "#f5f5f5",
  },
} as const;

/**
 * Theme name type: 'classic' | 'neon' | 'retro' | 'dark'.
 */
export type ThemeName = keyof typeof THEMES;

/* -------------------------------------------------------------------------- */
/* 🚧 TODOs                                                                  */
/* -------------------------------------------------------------------------- */
// - Add adjustable difficulty levels (affect INITIAL_SPEED).
// - Add sound effect constants (e.g., eat, collision, game over).
// - Introduce particle effects for visual feedback.

