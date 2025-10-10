import { GridSize, GRID_SIZES } from '../utils/constants';

interface GridSizeSelectorProps {
  currentSize: GridSize;
  onSizeChange: (size: GridSize) => void;
}

export const GridSizeSelector = ({ currentSize, onSizeChange }: GridSizeSelectorProps) => {
  const sizeLabels = {
    small: 'Small (15×15)',
    medium: 'Medium (20×20)',
    large: 'Large (30×30)'
  };

  const sizeDescriptions = {
    small: 'Easy - More space to maneuver',
    medium: 'Balanced - Classic experience',
    large: 'Hard - Tight spaces, high skill'
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Play Area Size</h3>
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(GRID_SIZES).map(([size, gridSize]) => (
          <button
            key={size}
            onClick={() => onSizeChange(size as GridSize)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              currentSize === size
                ? 'border-blue-500 bg-blue-500/20 text-blue-100'
                : 'border-gray-600 bg-gray-700 hover:border-gray-500 text-gray-300'
            }`}
          >
            <div className="font-semibold">{sizeLabels[size as GridSize]}</div>
            <div className="text-sm opacity-75">{sizeDescriptions[size as GridSize]}</div>
          </button>
        ))}
      </div>
    </div>
  );
};