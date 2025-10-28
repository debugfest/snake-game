// Game-related type definitions
import { GridSize } from '../utils/constants';

export interface Position {
  x: number;
  y: number;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum GameStatus {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER',
}

export enum GameMode {
  SINGLE = 'SINGLE',
  TWO_PLAYER = 'TWO_PLAYER',
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  score: number;
  gameStatus: GameStatus;
  highScore: number;
  gridSize: GridSize;
  // Optional 2P fields
  snake2?: Position[];
  direction2?: Direction;
  score2?: number;
}
