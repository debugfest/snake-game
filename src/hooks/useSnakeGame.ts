import { useState, useCallback, useEffect } from 'react';
import { Direction, GameStatus, Position } from '../types/game';
import {
  generateFoodPosition,
  getNextPosition,
  isOutOfBounds,
  checkCollision,
  isOppositeDirection,
} from '../utils/gameHelpers';
import { GridSize, GRID_SIZES, INITIAL_SNAKE_LENGTH } from '../utils/constants';
import { useSound } from './useSound';

/**
 * Custom hook that manages the full Snake Game logic and state.
 * It handles:
 * - Snake movement and direction control
 * - Collision detection (wall and self)
 * - Food spawning and scoring
 * - Game lifecycle (start, pause, resume, reset)
 * - Grid size selection and persistence
 * - Sound effects for actions
 *
 * @returns {object} Game state and control functions
 */
export const useSnakeGame = () => {
  /** 🎵 Import the sound hook to manage audio actions */
  const { playEatSound, playGameOverSound, isMuted, toggleMute } = useSound();

  /** 🧩 Grid size (small, medium, large) is stored and persisted in localStorage */
  const [gridSize, setGridSize] = useState<GridSize>(
    () => (localStorage.getItem('gridSize') as GridSize) || 'medium'
  );

  /**
   * Creates the initial snake body at the center of the grid.
   * @param {GridSize} currentGridSize - Grid size (small, medium, large)
   * @returns {Position[]} Array of snake segment positions
   */
  const getInitialSnake = (currentGridSize: GridSize = gridSize): Position[] => {
    const gridDimension = GRID_SIZES[currentGridSize];
    const centerY = Math.floor(gridDimension / 2);
    const centerX = Math.floor(gridDimension / 2);
    const snake: Position[] = [];

    // Snake starts centered, facing right
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      snake.push({ x: centerX - i, y: centerY });
    }

    return snake;
  };

  /** Snake Game State */
  const [snake, setSnake] = useState<Position[]>(getInitialSnake);
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [nextDirection, setNextDirection] = useState<Direction>(Direction.RIGHT);
  const [food, setFood] = useState<Position>(() =>
    generateFoodPosition(getInitialSnake(), GRID_SIZES[gridSize])
  );
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IDLE);

  /** 📱 Touch support for mobile swiping */
  const [touchStart, setTouchStart] = useState<Position | null>(null);

  /**
   * Stores the starting position of a touch to determine swipe direction.
   */
  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault(); // Prevent scrolling
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  /** Starts a new game session */
  const startGame = useCallback(() => {
    const initialSnake = getInitialSnake();
    setSnake(initialSnake);
    setDirection(Direction.RIGHT);
    setNextDirection(Direction.RIGHT);
    setFood(generateFoodPosition(initialSnake, GRID_SIZES[gridSize]));
    setScore(0);
    setGameStatus(GameStatus.PLAYING);
  }, []);

  /**
   * Handles the swipe gesture on mobile to change snake direction.
   */
  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      // Allow starting a game via swipe
      if (gameStatus === GameStatus.IDLE || gameStatus === GameStatus.GAME_OVER) {
        startGame();
        setTouchStart(null);
        return;
      }
      if (!touchStart || gameStatus !== GameStatus.PLAYING) return;

      const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
      const dx = touchEnd.x - touchStart.x;
      const dy = touchEnd.y - touchStart.y;
      let newDirection: Direction | null = null;
      const minSwipeDistance = 30;

      // Horizontal or vertical swipe detection
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > minSwipeDistance)
          newDirection = dx > 0 ? Direction.RIGHT : Direction.LEFT;
      } else {
        if (Math.abs(dy) > minSwipeDistance)
          newDirection = dy > 0 ? Direction.DOWN : Direction.UP;
      }

      if (newDirection && !isOppositeDirection(direction, newDirection)) {
        setNextDirection(newDirection);
      }

      setTouchStart(null);
    },
    [touchStart, direction, gameStatus, startGame]
  );

  /**  Persist high score in localStorage */
  useEffect(() => {
    localStorage.setItem('snakeHighScore', highScore.toString());
  }, [highScore]);

  /**
   * Handles keyboard input for snake direction control.
   */
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (gameStatus !== GameStatus.PLAYING) return;

      let newDirection: Direction | null = null;

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          newDirection = Direction.UP;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          newDirection = Direction.DOWN;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newDirection = Direction.LEFT;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          newDirection = Direction.RIGHT;
          break;
      }

      // Prevent 180° turns
      if (newDirection && !isOppositeDirection(direction, newDirection)) {
        setNextDirection(newDirection);
        event.preventDefault();
      }
    },
    [direction, gameStatus]
  );

  /** Set up keyboard and touch listeners */
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      window.addEventListener('touchstart', handleTouchStart, { passive: false });
      window.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (isTouchDevice) {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleKeyPress, handleTouchEnd]);

  /**
   * Allows switching between grid sizes and resets the game.
   */
  const changeGridSize = useCallback((newSize: GridSize) => {
    setGridSize(newSize);
    localStorage.setItem('gridSize', newSize);
    const newSnake = getInitialSnake(newSize);
    setSnake(newSnake);
    setFood(generateFoodPosition(newSnake, GRID_SIZES[newSize]));
    setScore(0);
    setGameStatus(GameStatus.IDLE);
  }, []);

  /**
   * Main game loop — called repeatedly to update the snake’s position.
   * Handles:
   * - Movement and direction updates
   * - Wall and self collision detection
   * - Food consumption and scoring
   */
  const updateGame = useCallback(() => {
    if (gameStatus !== GameStatus.PLAYING) return;
    const currentGridSize = GRID_SIZES[gridSize];

    setDirection(nextDirection);
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = newSnake[0];
      const newHead = getNextPosition(head, nextDirection);

      // Collision checks
      if (isOutOfBounds(newHead, currentGridSize) || checkCollision(newHead, newSnake)) {
        playGameOverSound();
        setGameStatus(GameStatus.GAME_OVER);
        return prevSnake;
      }

      newSnake.unshift(newHead);

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        playEatSound();
        setScore((prevScore) => {
          const newScore = prevScore + 10;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        setFood(generateFoodPosition(newSnake, currentGridSize));
        return newSnake;
      } else {
        // Move normally
        newSnake.pop();
        return newSnake;
      }
    });
  }, [gameStatus, nextDirection, food, gridSize, highScore, playEatSound, playGameOverSound]);

  /** Pauses gameplay */
  const pauseGame = useCallback(() => {
    if (gameStatus === GameStatus.PLAYING) setGameStatus(GameStatus.PAUSED);
  }, [gameStatus]);

  /** Resumes gameplay */
  const resumeGame = useCallback(() => {
    if (gameStatus === GameStatus.PAUSED) setGameStatus(GameStatus.PLAYING);
  }, [gameStatus]);

  /**Resets everything to the starting state */
  const resetGame = useCallback(() => {
    const initialSnake = getInitialSnake();
    setSnake(initialSnake);
    setDirection(Direction.RIGHT);
    setNextDirection(Direction.RIGHT);
    setFood(generateFoodPosition(initialSnake, GRID_SIZES[gridSize]));
    setScore(0);
    setGameStatus(GameStatus.IDLE);
  }, []);

  return {
    snake,
    food,
    score,
    highScore,
    gameStatus,
    gridSize,
    updateGame,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    changeGridSize,
    isMuted,
    toggleMute,
  };
};

// Future enhancements
// - Add power-ups (speed boost, invincibility, score multiplier)
// - Add obstacles or random barriers
// - Implement multiple difficulty levels
// - Introduce special food types with different points
// - Gradually increase speed with score

