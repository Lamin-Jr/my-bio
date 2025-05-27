import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeMode } from '../types';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get initial theme from localStorage or use system preference
  const getInitialTheme = (): ThemeMode => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      return savedTheme;
    }
    
    return 'system';
  };
  
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  
  const applyTheme = (newTheme: ThemeMode) => {
    const root = window.document.documentElement;
    const isDark = 
      newTheme === 'dark' || 
      (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Apply dark class to html element
    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme);
  };
  
  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  
  // Listen for system preference changes when using 'system' theme
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      applyTheme('system');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  
  // Toggle between light and dark (ignoring system)
  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  
  const value = {
    theme,
    setTheme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};