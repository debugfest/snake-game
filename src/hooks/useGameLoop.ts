import { useEffect, useRef, useCallback } from "react";

/**
 * 🎮 useGameLoop Hook
 * --------------------------------------------------------------------------
 * A custom React hook for managing the game’s animation loop using
 * `requestAnimationFrame`. It executes the provided callback function
 * at controlled intervals for smooth, frame-based updates.
 *
 * @param callback  - Function to run each frame/tick (e.g., game update logic)
 * @param delay     - Time (in ms) between each update
 * @param isRunning - Whether the loop should currently be active
 *
 * Ensures consistent gameplay speed regardless of browser frame rate.
 */

/* -------------------------------------------------------------------------- */
/* ⚙️ Hook Definition                                                        */
/* -------------------------------------------------------------------------- */

export const useGameLoop = (
  callback: () => void,
  delay: number,
  isRunning: boolean
) => {
  // Holds the ID of the current animation frame request
  const requestRef = useRef<number>();

  // Tracks the timestamp of the last executed frame
  const previousTimeRef = useRef<number>();

  /**
   * 🔁 Animation function
   * Handles timing and ensures the callback runs only when
   * the specified delay has elapsed since the last execution.
   */
  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;

        // Run the callback only when the delay interval has passed
        if (deltaTime >= delay) {
          callback();
          previousTimeRef.current = time; // Reset timestamp for next cycle
        }
      } else {
        // Initialize the previous timestamp on first run
        previousTimeRef.current = time;
      }

      // Continue the animation loop
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback, delay]
  );

  /**
   * 🧠 Effect: Start or stop the game loop
   * Starts the animation frame when `isRunning` is true.
   * Cancels it and resets timing when paused or stopped.
   */
  useEffect(() => {
    if (isRunning) {
      // Start the animation loop
      requestRef.current = requestAnimationFrame(animate);

      // Cleanup on unmount or when loop stops
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    } else {
      // Reset timing to ensure smooth resume
      previousTimeRef.current = undefined;
    }
  }, [isRunning, animate]);
};

/* -------------------------------------------------------------------------- */
/* 🧩 Future Enhancements                                                    */
/* -------------------------------------------------------------------------- */
// TODO: Add support for dynamic speed changes during gameplay
// TODO: Add performance monitoring (FPS tracking)
// TODO: Implement smoother resume transitions to prevent animation jumps
