import { useState, useCallback, useEffect } from "react";

/**
 * 🎵 useSound Hook
 * Handles sound effects (eat, game over) and mute toggling.
 * Persists user preference for mute state in localStorage.
 */

/* -------------------------------------------------------------------------- */
/* 🔊 Preload Audio Files                                                    */
/* -------------------------------------------------------------------------- */
// Preload sound assets once for instant playback during gameplay.
const eatSound = new Audio("/assets/sounds/eat.wav");
const gameOverSound = new Audio("/assets/sounds/end.flac");

export const useSound = () => {
  /* ------------------------------------------------------------------------ */
  /* 🎚️ Sound State Management                                              */
  /* ------------------------------------------------------------------------ */

  // Initialize mute state from localStorage (default: not muted)
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem("isSoundMuted") === "true";
  });

  // Persist mute preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isSoundMuted", String(isMuted));
  }, [isMuted]);

  /* ------------------------------------------------------------------------ */
  /* 🎛️ Sound Control Functions                                             */
  /* ------------------------------------------------------------------------ */

  // Toggle mute state (on/off)
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Play eating sound effect (only if not muted)
  const playEatSound = useCallback(() => {
    if (!isMuted) {
      eatSound.currentTime = 0; // Restart sound if it's already playing
      eatSound.play();
    }
  }, [isMuted]);

  // Play game over sound effect (only if not muted)
  const playGameOverSound = useCallback(() => {
    if (!isMuted) {
      gameOverSound.currentTime = 0;
      gameOverSound.play();
    }
  }, [isMuted]);

  /* ------------------------------------------------------------------------ */
  /* 📦 Hook Return                                                         */
  /* ------------------------------------------------------------------------ */

  // Expose controls and state to consuming components
  return {
    isMuted,
    toggleMute,
    playEatSound,
    playGameOverSound,
  };
};
