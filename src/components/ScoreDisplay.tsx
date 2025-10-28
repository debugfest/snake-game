import { Trophy, Target } from 'lucide-react';
import { GameStatus } from '../types/game';

interface ScoreDisplayProps {
  score: number;
  highScore: number;
  gameStatus: GameStatus;
  score2?: number;
  winner?: 'P1' | 'P2' | null;
}

// Component for displaying current score and high score
export const ScoreDisplay = ({ score, highScore, gameStatus, score2, winner }: ScoreDisplayProps) => {
  return (
    <div className="flex gap-6 justify-center items-center flex-wrap">
      {/* Current Score */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <Target size={24} />
          <div>
            <div className="text-sm font-medium opacity-90">Score</div>
            <div className="text-3xl font-bold">{score}</div>
          </div>
        </div>
      </div>

      {/* Player 2 Score (optional) */}
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

      {/* High Score */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white px-8 py-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <Trophy size={24} />
          <div>
            <div className="text-sm font-medium opacity-90">High Score</div>
            <div className="text-3xl font-bold">{highScore}</div>
          </div>
        </div>
      </div>

      {/* Game Status Indicator */}
      {gameStatus === GameStatus.GAME_OVER && (
        <div className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-lg animate-pulse">
          <div className="text-lg font-bold">{winner ? `${winner} WINS` : 'GAME OVER'}</div>
        </div>
      )}

      {gameStatus === GameStatus.PAUSED && (
        <div className="bg-yellow-600 text-white px-6 py-4 rounded-xl shadow-lg">
          <div className="text-lg font-bold">PAUSED</div>
        </div>
      )}
    </div>
  );
};

// TODO: Add score multiplier display for combos
// TODO: Add level/difficulty indicator
// TODO: Add time played counter
// TODO: Add leaderboard integration to show top 10 scores
// TODO: Add achievement badges for milestones (e.g., score 100, 500, 1000)
