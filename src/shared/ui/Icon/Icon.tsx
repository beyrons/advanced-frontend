import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';


interface IconProps extends React.SVGProps<SVGSVGElement>{  // Расширим интерфейс (SVGSVGElement): т.о. можно будет передавать извне размеры, цвет, events ...
    className?: string;                                     // это расширение было востребованно с момента добавления рейтинга в проект, для более гибкого управления SVG
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;          // Ссылка до иконки (global.d.ts)
    inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
    const { className, Svg, inverted, ...otherProps } = props;

    return (
        <Svg
            className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])}
            {...otherProps}
        />
    );
});
