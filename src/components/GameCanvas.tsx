import { useEffect, useRef } from 'react';
import { Position } from '../types/game';
import { CANVAS_SIZE, CELL_SIZE, COLORS } from '../utils/constants';

interface GameCanvasProps {
  snake: Position[];
  food: Position;
}

// Component responsible for rendering the game on a canvas element
export const GameCanvas = ({ snake, food }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid lines
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= CANVAS_SIZE; i += CELL_SIZE) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_SIZE);
      ctx.stroke();

      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_SIZE, i);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      // Head is drawn in a different color
      ctx.fillStyle = index === 0 ? COLORS.snakeHead : COLORS.snake;

      const x = segment.x * CELL_SIZE;
      const y = segment.y * CELL_SIZE;

      // Draw rounded rectangle for snake segments
      const radius = 4;
      ctx.beginPath();
      ctx.roundRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4, radius);
      ctx.fill();

      // Add highlight to head
      if (index === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.roundRect(x + 4, y + 4, CELL_SIZE - 8, (CELL_SIZE - 8) / 2, radius);
        ctx.fill();
      }
    });

    // Draw food as a circle
    ctx.fillStyle = COLORS.food;
    const foodX = food.x * CELL_SIZE + CELL_SIZE / 2;
    const foodY = food.y * CELL_SIZE + CELL_SIZE / 2;
    const foodRadius = CELL_SIZE / 3;

    ctx.beginPath();
    ctx.arc(foodX, foodY, foodRadius, 0, Math.PI * 2);
    ctx.fill();

    // Add glow effect to food
    ctx.shadowBlur = 10;
    ctx.shadowColor = COLORS.food;
    ctx.beginPath();
    ctx.arc(foodX, foodY, foodRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [snake, food]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      className="border-4 border-gray-700 rounded-lg shadow-2xl"
    />
  );
};

// TODO: Add particle effects when snake eats food
// TODO: Add trail effect behind snake for visual feedback
// TODO: Add obstacles rendering (walls, barriers)
// TODO: Add different snake skins/textures
// TODO: Add background patterns or themes
