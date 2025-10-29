import { Trophy, Target } from 'lucide-react';
import { GameStatus } from '../types/game';

/**
 * Props for the ScoreDisplay component.
 * Supports both single-player and two-player modes.
 */
interface ScoreDisplayProps {
  /** Player 1's current score */
  score: number;
  /** Highest score recorded */
  highScore: number;
  /** Current game state (e.g., PLAYING, PAUSED, GAME_OVER) */
  gameStatus: GameStatus;
  /** (Optional) Player 2's score, used in multiplayer mode */
  score2?: number;
  /** (Optional) Winner identifier for multiplayer mode */
  winner?: 'P1' | 'P2' | null;
}

/**
 * ScoreDisplay Component
 * ----------------------
 * Displays the current score, high score, and (if applicable) the second player’s score.
 * Also shows visual game status indicators such as “Game Over” or “Paused”.
 *
 * Features:
 * - Adaptive layout for single or two-player mode
 * - Dynamic color themes for clarity
 * - Animated status feedback on game events
 */
export const ScoreDisplay = ({
  score,
  highScore,
  gameStatus,
  score2,
  winner,
}: ScoreDisplayProps) => {
  return (
    <div className="flex gap-6 justify-center items-center flex-wrap">
      
      {/* 🟦 Player 1 - Current Score */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <Target size={24} />
          <div>
            <div className="text-sm font-medium opacity-90">Score</div>
            <div className="text-3xl font-bold">{score}</div>
          </div>
        </div>
      </div>

      {/* 🟣 Player 2 - Score (Visible only in multiplayer mode) */}
      {typeof score2 === 'number' && (
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white px-8 py-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <Target size={24} />
            <div>
              <div className="text-sm font-medium opacity-90">P2 Score</div>
              <div className="text-3xl font-bold">{score2}</div>
            </div>
          </div>
        </div>
      )}

      {/* 🟨 High Score Display */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white px-8 py-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <Trophy size={24} />
          <div>
            <div className="text-sm font-medium opacity-90">High Score</div>
            <div className="text-3xl font-bold">{highScore}</div>
          </div>
        </div>
      </div>

      {/* 🔴 Game Over Indicator */}
      {gameStatus === GameStatus.GAME_OVER && (
        <div className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-lg animate-pulse">
          <div className="text-lg font-bold">
            {winner ? `${winner} WINS` : 'GAME OVER'}
          </div>
        </div>
      )}

      {/* 🟡 Pause Indicator */}
      {gameStatus === GameStatus.PAUSED && (
        <div className="bg-yellow-600 text-white px-6 py-4 rounded-xl shadow-lg">
          <div className="text-lg font-bold">PAUSED</div>
        </div>
      )}
    </div>
  );
};

/* 
 * TODO Enhancements:
 * - Add score multiplier display for combos
 * - Include level/difficulty indicator
 * - Add timer showing total time played
 * - Integrate leaderboard for top 10 scores
 * - Unlock achievement badges (e.g., score milestones: 100, 500, 1000)
 */
