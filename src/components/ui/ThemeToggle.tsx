import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';
import { Sun, Moon, Monitor } from 'lucide-react';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    const getIcon = () => {
        if (theme === 'light') return <Sun className="h-4 w-4" />;
        if (theme === 'dark') return <Moon className="h-4 w-4" />;
        return <Monitor className="h-4 w-4" />;
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {getIcon()}
        </Button>
    );
};