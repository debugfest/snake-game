import { useEffect, useRef, useCallback } from 'react';

// Custom hook for managing game loop with requestAnimationFrame
// Provides smooth animation by calling the callback at specified intervals
export const useGameLoop = (callback: () => void, delay: number, isRunning: boolean) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;

        // Only execute callback if enough time has passed
        if (deltaTime >= delay) {
          callback();
          previousTimeRef.current = time;
        }
      } else {
        previousTimeRef.current = time;
      }

      requestRef.current = requestAnimationFrame(animate);
    },
    [callback, delay]
  );

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    } else {
      // Reset the timer when paused
      previousTimeRef.current = undefined;
    }
  }, [isRunning, animate]);
};

// TODO: Add support for dynamic speed changes during gameplay
// TODO: Add performance monitoring to track FPS
// TODO: Add pause/resume smoothing to prevent jerky animations
