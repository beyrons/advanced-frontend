import React, { InputHTMLAttributes, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

// Omit -- позволяет забрать из типа все пропсы, но исключить, те, которые не нужны:
// InputHTMLAttributes<HTMLInputElement> -- то, что мы хотим забрать
// 'value' | 'onChange' -- что мы хотим исключить. Указываем свойства через |

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>


interface InputProps extends HTMLInputProps{    // расширение стандартных пропсов
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    readonly?: boolean;
}


export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        readonly,
        ...otherProps
    } = props;

    // стандартный Input.onChange принимает event. Но мы хотим сразу отдавать value
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    // создаем визуальное отличие состояния readonly
    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    return (
        <div className={classNames(cls.Input, {}, [className])}>
            <input
                type={type}
                value={value}
                onChange={onChangeHandler}
                readOnly={readonly}
                placeholder={placeholder}
            />
        </div>
    );
});
