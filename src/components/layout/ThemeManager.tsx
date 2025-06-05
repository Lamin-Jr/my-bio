import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/appHooks';
import { selectTheme, applyTheme } from '@/store/theme/themeSlice';

export const ThemeManager = () => {
    const theme = useAppSelector(selectTheme);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        if (theme !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => applyTheme('system');

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    return null;
};