import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';
import StarIcon from '../../assets/icons/star.svg';


interface StarRatingProps {
    className?: string;
    onSelect?: (starCount: number) => void;     // на какую звезду нажал пользователь
    size?: number;                              // размер звезд
    selectedStars?: number;                     // количество выбранных звезд (подсветка оценки)
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, size = 30, selectedStars = 0 } = props;

    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);  // фиксируем, на какую из звезд пользователь направил мышку, чтобы подсвечивать предыдущие
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));       // пользователь уже выбрал количество звезд и чтобы это состояние определить, мы можем смотреть на 'selectedStars'


    // === хэндлеры: onHover и onLeave, с помощью которых определяем - курсор над звездами или нет ===
    const onHover = (starsCount: number) => () => {                             // поскольку мы итеррируемся по массиву, используем замыкание: из функции вернем функцию
        if (!isSelected) {
            // если элементы не выбраны, тогда мы должны установить, на какую звезду пользователь направил
            setCurrentStarsCount(starsCount);
        }
    };

    // курсор вышел за пределы звезд
    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    // Обрабатываем нажатие на звезду
    const onCLick = (startCount: number) => () => {     // исполльзуем замыкание, чтобы прокинуть "наверх" количество звезд
        if (!isSelected) {                              // если пользователь еще не выбрал количество звезд
            onSelect?.(startCount);                     // используем callback-функцию
            setCurrentStarsCount(startCount);           // подсветка есть/нет
            setIsSelected(true);                        // т.е. пользователь выбрал количество звезд
        }
    };

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((starNumber) => (
                <Icon
                    className={classNames(
                        cls.starIcon,
                        { [cls.selected]: isSelected },
                        [currentStarsCount >= starNumber ? cls.hovered : cls.normal],
                    )}
                    Svg={StarIcon}
                    key={starNumber}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onCLick(starNumber)}
                />
            ))}
        </div>
    );
});
