import { useState, useCallback, useEffect } from 'react';
import { Direction, GameStatus, Position } from '../types/game';
import {
  generateFoodPosition,
  getNextPosition,
  isOutOfBounds,
  checkCollision,
  isOppositeDirection,
} from '../utils/gameHelpers';
import { GRID_SIZE, INITIAL_SNAKE_LENGTH } from '../utils/constants';

//importing sound hook
import { useSound } from './useSound';

// Custom hook that manages all game state and logic
export const useSnakeGame = () => {
  // Use the sound hook with cleaner names
  const { playEatSound, playGameOverSound, isMuted, toggleMute } = useSound();
  // Initialize snake in the center of the grid, moving right
  const getInitialSnake = (): Position[] => {
    const centerY = Math.floor(GRID_SIZE / 2);
    const centerX = Math.floor(GRID_SIZE / 2);
    const snake: Position[] = [];

    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      snake.push({ x: centerX - i, y: centerY });
    }

    return snake;
  };

  const [snake, setSnake] = useState<Position[]>(getInitialSnake);
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [nextDirection, setNextDirection] = useState<Direction>(Direction.RIGHT);
  const [food, setFood] = useState<Position>(() => generateFoodPosition(getInitialSnake()));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IDLE);


  const [touchStart, setTouchStart] = useState<Position | null>(null);
  
  const handleTouchStart = (e: TouchEvent) => {
        // Prevent screen scrolling when swiping
        e.preventDefault();
        setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  // Start new game
  const startGame = useCallback(() => {
    const initialSnake = getInitialSnake();
    setSnake(initialSnake);
    setDirection(Direction.RIGHT);
    setNextDirection(Direction.RIGHT);
    setFood(generateFoodPosition(initialSnake));
    setScore(0);
    setGameStatus(GameStatus.PLAYING);
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
        if(gameStatus === GameStatus.IDLE || gameStatus === GameStatus.GAME_OVER){
          startGame();
          setTouchStart(null);
          return;
        }
        if (!touchStart || gameStatus !== GameStatus.PLAYING) return;

        const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        
        const dx = touchEnd.x - touchStart.x;
        const dy = touchEnd.y - touchStart.y;
        
        let newDirection: Direction | null = null;

        const minSwipeDistance = 30; // Minimum distance for a swipe to be registered

        // Check for horizontal vs. vertical swipe
        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal swipe
            if (Math.abs(dx) > minSwipeDistance) {
              newDirection = dx > 0 ? Direction.RIGHT : Direction.LEFT;
            }
        } else {
            // Vertical swipe
          if (Math.abs(dy) > minSwipeDistance) {
            newDirection = dy > 0 ? Direction.DOWN : Direction.UP;
          }
        }

        if (newDirection && !isOppositeDirection(direction, newDirection)) {
            setNextDirection(newDirection);
        }

        setTouchStart(null);
  }, [touchStart, direction, gameStatus, startGame]);

  // Update high score in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('snakeHighScore', highScore.toString());
  }, [highScore]);

  // Handle keyboard input for direction changes
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

      // Prevent 180-degree turns
      if (newDirection && !isOppositeDirection(direction, newDirection)) {
        setNextDirection(newDirection);
        event.preventDefault();
      }
    },
    [direction, gameStatus]
  );

  // Set up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouchDevice) {
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: false });
      }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      // --- Check if it's a touch device ---
      if (isTouchDevice) {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleKeyPress, handleTouchEnd]);

  // Main game update function called each frame
  const updateGame = useCallback(() => {
    if (gameStatus !== GameStatus.PLAYING) return;

    // Update direction from buffered input
    setDirection(nextDirection);

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = getNextPosition(head, nextDirection);

      // Check for collisions with walls
      if (isOutOfBounds(newHead)) {
        playGameOverSound();
        setGameStatus(GameStatus.GAME_OVER);
        return prevSnake;
      }

      // Check for collisions with self
      if (checkCollision(newHead, prevSnake)) {
        playGameOverSound();
        setGameStatus(GameStatus.GAME_OVER);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check if snake ate food
      if (newHead.x === food.x && newHead.y === food.y) {
        playEatSound();
        setScore((prevScore) => {
          const newScore = prevScore + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
          }
          return newScore;
        });
        setFood(generateFoodPosition(newSnake));
        // Snake grows, don't remove tail
        return newSnake;
      } else {
        // Remove tail to maintain snake length
        newSnake.pop();
        return newSnake;
      }
    });
  }, [gameStatus, nextDirection, food, highScore, playEatSound, playGameOverSound]);


  // Pause game
  const pauseGame = useCallback(() => {
    if (gameStatus === GameStatus.PLAYING) {
      setGameStatus(GameStatus.PAUSED);
    }
  }, [gameStatus]);

  // Resume game
  const resumeGame = useCallback(() => {
    if (gameStatus === GameStatus.PAUSED) {
      setGameStatus(GameStatus.PLAYING);
    }
  }, [gameStatus]);

  // Reset game
  const resetGame = useCallback(() => {
    const initialSnake = getInitialSnake();
    setSnake(initialSnake);
    setDirection(Direction.RIGHT);
    setNextDirection(Direction.RIGHT);
    setFood(generateFoodPosition(initialSnake));
    setScore(0);
    setGameStatus(GameStatus.IDLE);
  }, []);

  return {
    snake,
    food,
    score,
    highScore,
    gameStatus,
    updateGame,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    isMuted,
    toggleMute,
  };
};

// TODO: Add power-ups (e.g., speed boost, invincibility, score multiplier)
// TODO: Add obstacles that appear randomly on the grid
// TODO: Add multiple difficulty levels with different speeds
// TODO: Add special food types with different point values
// TODO: Implement progressive speed increase as score grows
