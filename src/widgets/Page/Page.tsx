import { memo, MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getScrollRestoreByPath, scrollRestoreActions } from '@/features/ScrollRestore';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';


interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;

    // use useInfiniteScroll
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    // scrollRestore
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getScrollRestoreByPath(state, pathname));  // используем callback, т.к. селектор использует аргумент

    // подгрузка списка статей
    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    // scrollRestore -- восстанавливаем скролл, передаем позицию скролла
    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition; // ref={wrapperRef} -- берем часть <section>, на которой висит скролл
    });

    // scrollRestore -- сохраняем скролл
    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        // console.log('SCROLL');
        dispatch(scrollRestoreActions.setScrollPosition({
            position: e.currentTarget.scrollTop,        // позиция scroll'a
            path: pathname,                             // адрес страницы
        }));
    }, 500);                                            // если выставить 0, то в консоли будет виден эффект хука

    return (
        // main - т.к. здесь находится главная информация (SEO)
        <main
            // элемент, в котором scroll
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={onScroll}
        >
            { children }
            {/* <div ref={triggerRef} /> */}
            { onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null }
        </main>
    );
});
