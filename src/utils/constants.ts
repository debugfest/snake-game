// Game configuration constants

export const GRID_SIZE = 20; // Number of cells in each dimension
export const CELL_SIZE = 25; // Pixel size of each cell
export const CANVAS_SIZE = GRID_SIZE * CELL_SIZE; // Total canvas size in pixels

export const INITIAL_SNAKE_LENGTH = 3;
export const INITIAL_SPEED = 150; // Milliseconds per frame

// Colors
export const COLORS = {
  background: '#1a1a2e',
  grid: '#16213e',
  snake: '#0f3460',
  snakeHead: '#e94560',
  food: '#f39c12',
  text: '#ffffff',
};

// TODO: Add difficulty levels that adjust INITIAL_SPEED
// TODO: Add different color themes/skins
// TODO: Add sound effect constants for eating, game over, etc.
