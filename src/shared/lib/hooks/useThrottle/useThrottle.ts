// позволяет выполнить одно событие в промежуток времени
import { useCallback, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {      // принимаем некое событие и ставим задержку
    const throttleRef = useRef(false);                                  // храним значение, можно вызывать callback или нет

    return useCallback((...args: any[]) => {
        if (!throttleRef.current) {                                     // вызываем callback, меняем значение throttleRef.current на true ...
            callback(...args);
            throttleRef.current = true;

            // ... и все последующие вызовы callback будут проигнорированны до тех пор, пока не закончится delay (задержка в мил.секундах)
            setTimeout(() => {
                throttleRef.current = false;
            }, delay);
        }
    }, [callback, delay]);
}
