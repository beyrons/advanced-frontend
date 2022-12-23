import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';


export enum ButtonTheme {
    CLEAR = 'clear',        // тема "чистая кнопка"
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;     // для передачи параметров извне
    theme?: ButtonTheme;    // тема кнопки
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;   // предпочтительнее указывать children  вручную, т.к. в React-18 из FC его убрали
    fullWidth?: boolean;    // отрисовка на всю ширину, как правило для мобильных устройств
}


// Чаще всего в "Button" в качестве "children" используется "string",
// т.е. в кнопке никогда не будет сложной древовидной структуры (объекта), но всегда будет "примитив"(строка),
// которую сравнивать легко(процессор), а хранить "дешево" (память).
//
// Объекты могут менять ссылки (могут находиться разных адресах памяти), строка - примитив, который сравнивается не по ссылке, а по значению
// Поэтому в данном случае, для кнопки, с пропсом "children", допустимо использование "memo"

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonTheme.OUTLINE,
        square,
        disabled,
        fullWidth,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    // дисейблим кнопку во время загрузки

    const mods: Mods = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disable]: disabled,    // добавляем стили задисейбленной кнопке
        [cls.fullWidth]: fullWidth,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
