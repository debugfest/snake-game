import { Position, Direction } from '../types/game';
import { GridSize, GRID_SIZES } from './constants';

/**
 * Generates a random position within the grid boundaries.
 * @param {number} gridSize - The width/height of the game grid.
 * @returns {Position} A random position object with x and y coordinates.
 */
export const generateRandomPosition = (gridSize: number): Position => {
  return {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };
};

/**
 * Checks whether two positions on the grid are the same.
 * @param {Position} pos1 - The first position.
 * @param {Position} pos2 - The second position.
 * @returns {boolean} True if both positions share the same x and y coordinates.
 */
export const positionsEqual = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

/**
 * Checks if a given position collides with any position in an array.
 * Commonly used to detect snake collisions or prevent spawning food on the snake.
 * @param {Position} position - The position to check for collision.
 * @param {Position[]} positions - The array of positions to check against.
 * @returns {boolean} True if there is a collision.
 */
export const checkCollision = (position: Position, positions: Position[]): boolean => {
  return positions.some((pos) => positionsEqual(pos, position));
};

/**
 * Calculates the next position of the snake’s head based on its current position and direction.
 * @param {Position} currentPos - The current position of the snake's head.
 * @param {Direction} direction - The current movement direction.
 * @returns {Position} The next position after moving one step in the given direction.
 */
export const getNextPosition = (currentPos: Position, direction: Direction): Position => {
  const nextPos = { ...currentPos };

  switch (direction) {
    case Direction.UP:
      nextPos.y -= 1;
      break;
    case Direction.DOWN:
      nextPos.y += 1;
      break;
    case Direction.LEFT:
      nextPos.x -= 1;
      break;
    case Direction.RIGHT:
      nextPos.x += 1;
      break;
  }

  return nextPos;
};

/**
 * Determines if a given position lies outside the grid boundaries.
 * Used to detect wall collisions.
 * @param {Position} position - The position to check.
 * @param {number} gridSize - The size of the grid.
 * @returns {boolean} True if the position is out of bounds.
 */
export const isOutOfBounds = (position: Position, gridSize: number): boolean => {
  return position.x < 0 || position.x >= gridSize || position.y < 0 || position.y >= gridSize;
};

/**
 * Checks whether two directions are opposites.
 * Prevents the snake from reversing 180 degrees directly into itself.
 * @param {Direction} current - The current direction of the snake.
 * @param {Direction} next - The new direction to test.
 * @returns {boolean} True if the two directions are opposite.
 */
export const isOppositeDirection = (current: Direction, next: Direction): boolean => {
  return (
    (current === Direction.UP && next === Direction.DOWN) ||
    (current === Direction.DOWN && next === Direction.UP) ||
    (current === Direction.LEFT && next === Direction.RIGHT) ||
    (current === Direction.RIGHT && next === Direction.LEFT)
  );
};

/**
 * Generates a new food position that does not overlap with the snake’s body.
 * @param {Position[]} snake - The current array of snake body positions.
 * @param {number} gridSize - The size of the game grid.
 * @returns {Position} A valid random food position.
 */
export const generateFoodPosition = (snake: Position[], gridSize: number): Position => {
  let foodPosition: Position;

  do {
    foodPosition = generateRandomPosition(gridSize);
  } while (checkCollision(foodPosition, snake)); // Ensure food doesn't spawn on the snake

  return foodPosition;
};

// TODO: Add function to calculate speed based on score (progressive difficulty)
// TODO: Add function to validate safe spawn positions for obstacles
// TODO: Add function to generate power-ups at random positions
