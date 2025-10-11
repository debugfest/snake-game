/**
 * Game configuration constants for grid sizes.
 * Defines available grid dimensions (width × height).
 */
export const GRID_SIZES = {
  /** Small grid: 15×15 cells (225 total). */
  small: 15,
  /** Medium grid: 20×20 cells (400 total). Default size. */
  medium: 20,
  /** Large grid: 30×30 cells (900 total). */
  large: 30,
} as const;

/**
 * Union type for grid size keys: 'small' | 'medium' | 'large'.
 */
export type GridSize = keyof typeof GRID_SIZES;

/**
 * Pixel size of each individual cell in the grid.
 * Used to determine how large the game appears visually.
 */
export const CELL_SIZE = 25;

/**
 * Default grid size setting.
 * This can be changed dynamically by the player.
 */
export const DEFAULT_GRID_SIZE: GridSize = 'medium';

/**
 * Numeric grid dimension (based on DEFAULT_GRID_SIZE).
 */
export const GRID_SIZE = GRID_SIZES[DEFAULT_GRID_SIZE];

/**
 * The number of snake body segments at the start of a new game.
 */
export const INITIAL_SNAKE_LENGTH = 3;

/**
 * Initial game speed in milliseconds per frame.
 * Lower values = faster game.
 */
export const INITIAL_SPEED = 150;

/**
 * Default color palette for classic gameplay.
 * Used as a fallback when no theme is selected.
 */
export const COLORS = {
  background: "#1a1a2e",
  grid: "#16213e",
  snake: "#0f3460",
  snakeHead: "#e94560",
  food: "#f39c12",
  text: "#ffffff",
};

/**
 * Theme presets for different visual styles.
 * Each theme defines its own colors for background, grid, snake, food, and text.
 */
export const THEMES = {
  classic: {
    name: "Classic",
    background: "#1a1a2e",
    grid: "#16213e",
    snake: "#0f3460",
    snakeHead: "#e94560",
    food: "#f39c12",
    text: "#ffffff",
  },
  neon: {
    name: "Neon",
    background: "#000000",
    grid: "#111111",
    snake: "#00ff9d",
    snakeHead: "#ff00ff",
    food: "#00ffff",
    text: "#ffffff",
  },
  retro: {
    name: "Retro",
    background: "#2b2b2b",
    grid: "#1e1e1e",
    snake: "#76c893",
    snakeHead: "#f4a261",
    food: "#e76f51",
    text: "#e9c46a",
  },
  dark: {
    name: "Dark Mode",
    background: "#0a0a0a",
    grid: "#1a1a1a",
    snake: "#10b981",
    snakeHead: "#f43f5e",
    food: "#facc15",
    text: "#f5f5f5",
  },
};

/**
 * Union type for theme names: 'classic' | 'neon' | 'retro' | 'dark'.
 */
export type ThemeName = keyof typeof THEMES;

// TODO: Add difficulty levels that adjust INITIAL_SPEED.
// TODO: Add sound effect constants for eating, game over, etc.
