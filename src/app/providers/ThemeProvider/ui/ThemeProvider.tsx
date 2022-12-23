// провайдер контекста для доступа с любого компонента к темам
import React, { ReactNode, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

// По умолчанию устанавливается светлая тема, если другая не задана в locale.storage.
// Поэтому создаем интерфейс, чтобы передавать тему через пропсы
interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}


// поскольку провайдером будем оборачивать дургие компоненты, то создаем props, для получения этого компонента
// в react 18 убрали children из FC
const ThemeProvider = (props: ThemeProviderProps) => {
    const {
        children,
        initialTheme,
    } = props;

    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    // т.к. <ThemeContext.Provider value={{ - объект, то будет перерисовка при обновлении. Для устранения этого используем 'memo'
    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
