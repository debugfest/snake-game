import { GameCanvas } from "./components/GameCanvas";
import { GameControls } from "./components/GameControls";
import { ScoreDisplay } from "./components/ScoreDisplay";
import { useSnakeGame } from "./hooks/useSnakeGame";
import { useGameLoop } from "./hooks/useGameLoop";
import { GameStatus } from "./types/game";
import { INITIAL_SPEED, ThemeName, THEMES } from "./utils/constants";
import { useEffect, useState } from "react";
import { ThemeSelector } from "./components/ThemeSelector";
import { GridSizeSelector } from "./components/GridSizeSelector";

function App() {
  const {
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
  } = useSnakeGame();

  const [theme, setTheme] = useState<ThemeName>(
    () => (localStorage.getItem("theme") as ThemeName) || "classic"
  );

  useEffect(() => {
    const current = THEMES[theme];
    Object.entries(current).forEach(([key, value]) => {
      if (key !== "name") {
        document.body.style.setProperty(`--${key}`, value as string);
      }
    });
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Game loop runs only when game is playing
  useGameLoop(updateGame, INITIAL_SPEED, gameStatus === GameStatus.PLAYING);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 transition-colors duration-500"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text)",
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">
            Snake Game
          </h1>
          <p className="text-gray-400 text-lg">
            Use arrow keys or WASD to control the snake
          </p>
        </div>

        {/* Settings Section */}
        <div className="flex gap-6">
          <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
          <GridSizeSelector currentSize={gridSize} onSizeChange={changeGridSize} />
        </div>

        {/* Score Display */}
        <ScoreDisplay
          score={score}
          highScore={highScore}
          gameStatus={gameStatus}
        />

        {/* Game Canvas */}
        <GameCanvas snake={snake} food={food} gridSize={gridSize} />

        {/* Game Controls */}
        <GameControls
          gameStatus={gameStatus}
          onStart={startGame}
          onPause={pauseGame}
          onResume={resumeGame}
          onReset={resetGame}
          isMuted={isMuted}
          onToggleMute={toggleMute}
        />

        {/* Instructions */}
        <div className="bg-gray-800 rounded-lg p-6 max-w-2xl text-gray-300 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-3">How to Play</h3>
          <ul className="space-y-2 text-sm">
            <li>• Control the snake using arrow keys or WASD</li>
            <li>
              • Eat the yellow food to grow longer and increase your score
            </li>
            <li>• Avoid hitting the walls or yourself</li>
            <li>• Try to beat your high score!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

// TODO: Add settings modal for customizing game (speed, theme, grid size)
// TODO: Add sound effects using Web Audio API
// TODO: Add animations for game over and new high score
// TODO: Add mobile-responsive touch controls
// TODO: Add online leaderboard integration with Supabase
