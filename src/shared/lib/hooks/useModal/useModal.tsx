import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';


interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
}

export function useModal({ onClose, isOpen, animationDelay }: UseModalProps) {
    const [isMounted, setIsMounted] = useState(false);              // вмонтирована модалка в дом-дерево или нет
    const [isClosing, setIsClosing] = useState(false);
    const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    useEffect(() => {                                               // управляем монтированием модального окна
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const close = useCallback(() => {                               // анимация при закрытии модальной формы
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {            // слушатель клавиатуры
        if (e.key === 'Escape') {
            close();
        }
    }, [close]);                                                     // при перерендере, функции создаются заново, поэтому сохраняем значение функции

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);           // если окно открыто, то накидываем на приложение слушатель события "keydown"
        }

        return () => {
            clearTimeout(timeRef.current);
            window.removeEventListener('keydown', onKeyDown);        // слушатель события тоже необходимо очищать
        };
    }, [isOpen, onKeyDown]);


    return {
        isClosing,
        isMounted,
        close,
    };
}
