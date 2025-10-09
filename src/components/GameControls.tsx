import { Play, Pause, RotateCcw } from 'lucide-react';
import { GameStatus } from '../types/game';

interface GameControlsProps {
  gameStatus: GameStatus;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

// Component for game control buttons
export const GameControls = ({
  gameStatus,
  onStart,
  onPause,
  onResume,
  onReset,
}: GameControlsProps) => {
  const buttonBaseClasses =
    'px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg';

  const renderMainButton = () => {
    switch (gameStatus) {
      case GameStatus.IDLE:
        return (
          <button
            onClick={onStart}
            className={`${buttonBaseClasses} bg-green-600 hover:bg-green-700`}
          >
            <Play size={20} />
            Start Game
          </button>
        );
      case GameStatus.PLAYING:
        return (
          <button
            onClick={onPause}
            className={`${buttonBaseClasses} bg-yellow-600 hover:bg-yellow-700`}
          >
            <Pause size={20} />
            Pause
          </button>
        );
      case GameStatus.PAUSED:
        return (
          <button
            onClick={onResume}
            className={`${buttonBaseClasses} bg-blue-600 hover:bg-blue-700`}
          >
            <Play size={20} />
            Resume
          </button>
        );
      case GameStatus.GAME_OVER:
        return (
          <button
            onClick={onStart}
            className={`${buttonBaseClasses} bg-green-600 hover:bg-green-700`}
          >
            <Play size={20} />
            Play Again
          </button>
        );
    }
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      {renderMainButton()}

      {gameStatus !== GameStatus.IDLE && (
        <button
          onClick={onReset}
          className={`${buttonBaseClasses} bg-gray-600 hover:bg-gray-700`}
        >
          <RotateCcw size={20} />
          Reset
        </button>
      )}
    </div>
  );
};

// TODO: Add settings button to configure game options (speed, difficulty, theme)
// TODO: Add mute/unmute button for sound effects
// TODO: Add keyboard shortcut hints (display controls overlay)
// TODO: Add mobile touch controls for directional input
