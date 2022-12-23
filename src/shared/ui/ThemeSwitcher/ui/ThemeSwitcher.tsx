import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import LightIcon from '@/shared/assets/icons/theme-light.svg'; // добавляем декларацию в 'global.d.ts'
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import GrayIcon from '@/shared/assets/icons/theme-gray.svg';

// import {Theme} from "app/providers/ThemeProvider/lib/ThemeContext"; - темы импортируются не из publicAPI, так делать плохо
// поэтому исправляем и делаем из "publicAPI: "
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import { Button, ButtonTheme } from '../../Button/Button';

interface ThemeSwitcherProps {
    className?: string; // для передачи параметров извне
}


export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme(); // применяем в любой точке приложения

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {/* svgLoader преобразовывает обычные иконки в реакт-компонент */}
            {/* { theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon /> } */}
            { theme === Theme.LIGHT
                ? <LightIcon />
                : theme === Theme.GRAY ? <DarkIcon /> : <GrayIcon /> }

        </Button>

    );
});
