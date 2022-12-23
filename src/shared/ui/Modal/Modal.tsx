import React, { ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 200;


export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy } = props;
    const { close, isClosing, isMounted } = useModal({ isOpen, onClose, animationDelay: ANIMATION_DELAY });
    const { theme } = useTheme();

    // стили по условию
    const mods: Mods = {
        [cls.opened]: isOpen,                                            // накидывается, когда окно открыто
        [cls.isClosing]: isClosing,                                      // возвращаем isClosing в false
    };

    if (lazy && !isMounted) {                                           // модалку в дом-дерево не монтируем
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <Overlay onClick={close} />
                <div className={cls.content}>
                    { children }
                </div>
            </div>
        </Portal>
    );
};
