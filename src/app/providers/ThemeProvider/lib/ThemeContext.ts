import { createContext } from 'react';

export enum Theme {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
    GRAY = 'app_gray_theme',
}

// тип для Context
export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});

// сохранение темы после того, как пользователь закрыл браузер
export const LOCAL_STORAGE_THEME_KEY = 'theme';
