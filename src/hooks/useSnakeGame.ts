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
  // 2P state
  const [isTwoPlayer, setIsTwoPlayer] = useState<boolean>(() => localStorage.getItem('twoPlayer') === 'true');
  const [snake2, setSnake2] = useState<Position[]>(() => (isTwoPlayer ? getInitialSnake() : []));
  const [direction2, setDirection2] = useState<Direction>(Direction.LEFT);
  const [nextDirection2, setNextDirection2] = useState<Direction>(Direction.LEFT);
  const [food, setFood] = useState<Position>(() =>
    generateFoodPosition(getInitialSnake(), GRID_SIZES[gridSize])
  );
  const [score, setScore] = useState(0);
  const [score2, setScore2] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [winner, setWinner] = useState<null | 'P1' | 'P2'>(null);

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
    const gridDim = GRID_SIZES[gridSize];
    // Player 2 starts mirrored if 2P
    const centerY = Math.floor(gridDim / 2);
    const centerX = Math.floor(gridDim / 2);
    const initialSnake2: Position[] = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake2.push({ x: centerX + i, y: centerY });
    }

    setSnake(initialSnake);
    setDirection(Direction.RIGHT);
    setNextDirection(Direction.RIGHT);
    if (isTwoPlayer) {
      setSnake2(initialSnake2);
      setDirection2(Direction.LEFT);
      setNextDirection2(Direction.LEFT);
    } else {
      setSnake2([]);
    }
    const taken = isTwoPlayer ? [...initialSnake, ...initialSnake2] : initialSnake;
    setFood(generateFoodPosition(taken, GRID_SIZES[gridSize]));
    setScore(0);
    setScore2(0);
    setWinner(null);
    setGameStatus(GameStatus.PLAYING);
  }, [gridSize, isTwoPlayer]);

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

      // Player 2 controls (IJKL)
      let newDirection2Local: Direction | null = null;
      switch (event.key) {
        case 'i':
        case 'I':
          newDirection2Local = Direction.UP;
          break;
        case 'k':
        case 'K':
          newDirection2Local = Direction.DOWN;
          break;
        case 'j':
        case 'J':
          newDirection2Local = Direction.LEFT;
          break;
        case 'l':
        case 'L':
          newDirection2Local = Direction.RIGHT;
          break;
      }

      // Prevent 180° turns
      if (newDirection && !isOppositeDirection(direction, newDirection)) {
        setNextDirection(newDirection);
        event.preventDefault();
      }
      if (isTwoPlayer && newDirection2Local && !isOppositeDirection(direction2, newDirection2Local)) {
        setNextDirection2(newDirection2Local);
        event.preventDefault();
      }
    },
    [direction, direction2, gameStatus, isTwoPlayer]
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
    const taken = isTwoPlayer ? [...newSnake, ...getInitialSnake(newSize).map((s) => ({ ...s, x: s.x + 1 }))] : newSnake;
    setFood(generateFoodPosition(taken, GRID_SIZES[newSize]));
    setScore(0);
    setScore2(0);
    setGameStatus(GameStatus.IDLE);
    setWinner(null);
  }, [isTwoPlayer]);

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
    if (isTwoPlayer) setDirection2(nextDirection2);

    // Compute next heads first
    let p1Died = false;
    let p2Died = false;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = newSnake[0];
      const newHead = getNextPosition(head, nextDirection);

      // Check vs walls/self and other snake
      const other = isTwoPlayer ? snake2 : [];
      if (
        isOutOfBounds(newHead, currentGridSize) ||
        checkCollision(newHead, newSnake) ||
        (isTwoPlayer && checkCollision(newHead, other))
      ) {
        p1Died = true;
        return prevSnake;
      }

      newSnake.unshift(newHead);
      return newSnake;
    });

    if (isTwoPlayer) {
      setSnake2((prevSnake2) => {
        const newSnake = [...prevSnake2];
        const head = newSnake[0];
        const newHead = getNextPosition(head, nextDirection2);
        const other = snake; // latest from closure
        if (
          isOutOfBounds(newHead, currentGridSize) ||
          checkCollision(newHead, newSnake) ||
          checkCollision(newHead, other)
        ) {
          p2Died = true;
          return prevSnake2;
        }
        newSnake.unshift(newHead);
        return newSnake;
      });
    }

    // Handle resolve after both snakes moved
    setTimeout(() => {
      if (p1Died || (isTwoPlayer && p2Died)) {
        playGameOverSound();
        setWinner(p1Died && p2Died ? null : p1Died ? 'P2' : 'P1');
        setGameStatus(GameStatus.GAME_OVER);
        return;
      }

      // Food consumption and tail popping
      setSnake((prev) => {
        const head = prev[0];
        const ate = head.x === food.x && head.y === food.y;
        if (ate) {
          playEatSound();
          setScore((s) => {
            const ns = s + 10;
            if (ns > highScore) setHighScore(ns);
            return ns;
          });
        }
        const next = ate ? [...prev] : [...prev.slice(0, prev.length - 1)];
        return next;
      });

      if (isTwoPlayer) {
        setSnake2((prev) => {
          const head = prev[0];
          const ate = head.x === food.x && head.y === food.y;
          if (ate) {
            playEatSound();
            setScore2((s) => s + 10);
          }
          const next = ate ? [...prev] : [...prev.slice(0, prev.length - 1)];
          return next;
        });
      }

      // If any player ate, respawn food away from both snakes
      const p1Ate = snake[0] && snake[0].x === food.x && snake[0].y === food.y;
      const p2Ate = isTwoPlayer && snake2[0] && snake2[0].x === food.x && snake2[0].y === food.y;
      if (p1Ate || p2Ate) {
        const taken = isTwoPlayer ? [...snake, ...snake2] : [...snake];
        setFood(generateFoodPosition(taken, currentGridSize));
      }
    });
  }, [gameStatus, nextDirection, nextDirection2, food, gridSize, highScore, isTwoPlayer, snake, snake2, playEatSound, playGameOverSound]);

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
    if (isTwoPlayer) {
      const gridDim = GRID_SIZES[gridSize];
      const centerY = Math.floor(gridDim / 2);
      const centerX = Math.floor(gridDim / 2);
      const initialSnake2: Position[] = [];
      for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
        initialSnake2.push({ x: centerX + i, y: centerY });
      }
      setSnake2(initialSnake2);
      setDirection2(Direction.LEFT);
      setNextDirection2(Direction.LEFT);
      setFood(generateFoodPosition([...initialSnake, ...initialSnake2], GRID_SIZES[gridSize]));
    } else {
      setSnake2([]);
      setFood(generateFoodPosition(initialSnake, GRID_SIZES[gridSize]));
    }
    setScore(0);
    setScore2(0);
    setGameStatus(GameStatus.IDLE);
    setWinner(null);
  }, [gridSize, isTwoPlayer]);

  const toggleTwoPlayer = useCallback(() => {
    setIsTwoPlayer((prev) => {
      const next = !prev;
      localStorage.setItem('twoPlayer', String(next));
      return next;
    });
  }, []);

  return {
    snake,
    snake2,
    food,
    score,
    score2,
    highScore,
    gameStatus,
    gridSize,
    isTwoPlayer,
    winner,
    updateGame,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    changeGridSize,
    isMuted,
    toggleMute,
    toggleTwoPlayer,
  };
};

// Future enhancements
// - Add power-ups (speed boost, invincibility, score multiplier)
// - Add obstacles or random barriers
// - Implement multiple difficulty levels
// - Introduce special food types with different points
// - Gradually increase speed with score

