// какие данные хук будет возвращать
import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '@/app/providers/ThemeProvider/lib/ThemeContext';

interface useThemeResult {
    toggleTheme: () => void;
    theme: Theme
}

export function useTheme(): useThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        // при переключении темы сохраняем значение в localStorage
        let newTheme: Theme;

        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.GRAY;
            break;
        case Theme.GRAY:
            newTheme = Theme.LIGHT;
            break;
        case Theme.LIGHT:
            newTheme = Theme.DARK;
            break;
        default: newTheme = Theme.LIGHT;
        }

        setTheme?.(newTheme);   // ? -- функция может вернуть undefined
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}
