import React from 'react';
import { Icon } from './Icon';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-[#5A6351] dark:text-[#CFF5E7] hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F0F2F5] dark:focus:ring-offset-[#1A1D1A] focus:ring-[#D7B877] transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Icon name="moon" className="w-6 h-6" />
      ) : (
        <Icon name="sun" className="w-6 h-6" />
      )}
    </button>
  );
};
