import { useState, useCallback, useEffect } from 'react';

// Preload audio files for instant playback
const eatSound = new Audio('/assets/sounds/eat.wav');
const gameOverSound = new Audio('/assets/sounds/end.flac');

export const useSound = () => {
    const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('isSoundMuted') === 'true';
});

useEffect(() => {
    localStorage.setItem('isSoundMuted', String(isMuted));
}, [isMuted]);

const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
}, []);

const playEatSound = useCallback(() => {
    if (!isMuted) {
        eatSound.currentTime = 0;
        eatSound.play();
    }
}, [isMuted]);

const playGameOverSound = useCallback(() => {
    if (!isMuted) {
        gameOverSound.currentTime = 0;
        gameOverSound.play();
    }
}, [isMuted]);

    return { isMuted, toggleMute, playEatSound, playGameOverSound };
};