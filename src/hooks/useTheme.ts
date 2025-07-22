import { useAppDispatch, useAppSelector } from '@/hooks/appHooks';
import { selectTheme, setTheme, toggleTheme } from '@/store/theme/themeSlice';
import {ThemeMode} from "src/components/interfaces";

export const useTheme = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);

    return {
        theme,
        setTheme: (theme: ThemeMode) => dispatch(setTheme(theme)),
        toggleTheme: () => dispatch(toggleTheme()),
    };
};