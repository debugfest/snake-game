import { Position, Direction } from '../types/game';
import { GridSize, GRID_SIZES } from './constants';

// Generate a random position on the grid
export const generateRandomPosition = (gridSize: number): Position => {
  return {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };
};

// Check if two positions are equal
export const positionsEqual = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

// Check if a position collides with any position in an array
export const checkCollision = (position: Position, positions: Position[]): boolean => {
  return positions.some((pos) => positionsEqual(pos, position));
};

// Get the next position based on current position and direction
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

// Check if the position is outside the grid boundaries
export const isOutOfBounds = (position: Position, gridSize: number): boolean => {
  return position.x < 0 || position.x >= gridSize || position.y < 0 || position.y >= gridSize;
};

// Get opposite direction (to prevent 180-degree turns)
export const isOppositeDirection = (current: Direction, next: Direction): boolean => {
  return (
    (current === Direction.UP && next === Direction.DOWN) ||
    (current === Direction.DOWN && next === Direction.UP) ||
    (current === Direction.LEFT && next === Direction.RIGHT) ||
    (current === Direction.RIGHT && next === Direction.LEFT)
  );
};

// Generate food position that doesn't overlap with snake
export const generateFoodPosition = (snake: Position[], gridSize: number): Position => {
  let foodPosition: Position;

  do {
    foodPosition = generateRandomPosition(gridSize);
  } while (checkCollision(foodPosition, snake));

  return foodPosition;
};

// TODO: Add function to calculate speed based on score (progressive difficulty)
// TODO: Add function to validate safe spawn positions for obstacles
// TODO: Add function to generate power-ups at random positions
