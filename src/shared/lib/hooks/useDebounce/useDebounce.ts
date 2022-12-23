// отменяет событие в промежуток времени
import { MutableRefObject, useCallback, useRef } from 'react';

export function useDebounce(callback: (...args: any[]) => void, delay: number) {        // принимаем некое событие и ставим задержку
    const timer = useRef() as MutableRefObject<any>;                                    // храним значение, можно вызывать callback или нет

    return useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current);        // очищаем таймаут
        }

        timer.current = setTimeout(() => {      // и до тех пор, пока новый таймер (delay) очищается, функция вызвана не будет
            callback(...args);                  // т.е. callback выполняется опеределенное время delay
        }, delay);
    }, [callback, delay]);
}
