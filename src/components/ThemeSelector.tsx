import { useEffect, useState } from "react";
import { THEMES, ThemeName } from "../utils/constants";

interface ThemeSelectorProps {
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

export const ThemeSelector = ({
  currentTheme,
  onThemeChange,
}: ThemeSelectorProps) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(currentTheme);

  useEffect(() => {
    setSelectedTheme(currentTheme);
  }, [currentTheme]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value as ThemeName;
    setSelectedTheme(newTheme);
    onThemeChange(newTheme);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="theme-selector" className="text-white font-medium">
        Select Theme
      </label>
      <select
        id="theme-selector"
        value={selectedTheme}
        onChange={handleChange}
        className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Object.entries(THEMES).map(([key, theme]) => (
          <option key={key} value={key}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};
