// Game configuration constants

export const GRID_SIZE = 20; // Number of cells in each dimension
export const CELL_SIZE = 25; // Pixel size of each cell
export const CANVAS_SIZE = GRID_SIZE * CELL_SIZE; // Total canvas size in pixels

export const INITIAL_SNAKE_LENGTH = 3;
export const INITIAL_SPEED = 150; // Milliseconds per frame

// Colors
export const COLORS = {
  background: "#1a1a2e",
  grid: "#16213e",
  snake: "#0f3460",
  snakeHead: "#e94560",
  food: "#f39c12",
  text: "#ffffff",
};

// TODO: Add difficulty levels that adjust INITIAL_SPEED
// TODO: Add different color themes/skins
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
export type ThemeName = keyof typeof THEMES;
// TODO: Add sound effect constants for eating, game over, etc.
