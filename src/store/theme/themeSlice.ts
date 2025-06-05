import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/index.ts';

export type ThemeMode = 'light' | 'dark' | 'system';

// Helper function to get initial theme
const getInitialTheme = (): ThemeMode => {
    if (typeof window === 'undefined') return 'system';

    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        return savedTheme;
    }

    return 'system';
};

const initialState: ThemeMode = getInitialTheme();

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (_, action: PayloadAction<ThemeMode>) => action.payload,
        toggleTheme: (state) => {
            if (state === 'system') return 'light';
            if (state === 'light') return 'dark';
            return 'light';
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

// Selector
export const selectTheme = (state: RootState) => state.theme;

// Apply theme to DOM
export const applyTheme = (theme: ThemeMode) => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const isDark =
        theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
    localStorage.setItem('theme', theme);
};

export default themeSlice.reducer;