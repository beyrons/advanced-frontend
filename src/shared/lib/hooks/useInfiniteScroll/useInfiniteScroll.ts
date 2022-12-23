import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;                        // вызывается, когда пересекли како-либо элемент
    triggerRef: MutableRefObject<HTMLElement>     // Ref на который будет "триггериться"
    wrapperRef: MutableRefObject<HTMLElement>     // wrapper внутри которого находиться scroll, в нашем случае Page? т.к. на этой странице scroll
}

export function useInfiniteScroll({ callback, wrapperRef, triggerRef }: UseInfiniteScrollOptions) {
    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        let observer: IntersectionObserver | null = null;

        if (callback) {
            const options = {                     // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
                root: wrapperElement,             // элемент в котором находится скролл
                rootMargin: '0px',
                threshold: 1.0,
            };

            // callback вызывается в тот момент, когда появляется элемент за которым мы следим
            observer = new IntersectionObserver(([entry]) => {        // entry - массив элементов, за которым мы наблюдаем
                if (entry.isIntersecting) {                           // убираем срабатывание на "исчезновение" callback'a
                    callback();                                       // т.е. объект появился в области видимости, вызываем callback
                }
            }, options);

            observer.observe(triggerElement);                         // за кем следим
        }

        // при размонтировании компонента во избежание утечек памяти, необходимо от этого наблюдения(observer) отказаться
        return () => {
            if (observer && triggerElement) {
                // eslint не понимает, что ссылка на объект никогда меняться не будет
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
