// 0. Чтобы не перегружать бандл создаем провайдер, для "ленивой" загрузки библиотек, только в тот момент, когда они действительно нужны.
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';


// 1. для того, чтобы корректно работала типизация, необходимо из библиотек вывести типы:
type SpringType = typeof import('@react-spring/web')
type GestureType = typeof import('@use-gesture/react')


// 2. храним типы в AnimationContextPayload
interface AnimationContextPayload {
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;     // true-состояние, когда библиотеки подгрузились
}

// 3. создаем реактовский контекст
const AnimationContext = createContext<AnimationContextPayload>({});


// 4. подгружаем библиотеки асинхронно, чтобы они не тянулись в бандл
const getAsyncAnimationModules = () => {
    // Для того, чтобы "подтянуть" какой-то модуль, пакет, json и т.п. используем асинхронный импорт: import('@react-spring/web')
    // Т.к. библиотеки зависят друг от друга, необходимо, чтобы функция завершалась только тогда, когда они обе загрузились
    // причем делаем параллельную загрузки, а не поочередно (по типу "async/await"):
    return Promise.all([
        import('@react-spring/web'),    // этот ленивый "import" работает с promise
        import('@use-gesture/react'),
    ]);
};

// 9. Создаем хук для удобной работы с провайдером:
export const useAnimationLibs = () => {
    return useContext(AnimationContext) as Required<AnimationContextPayload>;  // возращаем результат работы AnimationContext
    // "as Required<AnimationContextPayload>" -- указываем TS, что хук вернет все поля в обязательном порядке (они никогда не будут undefined)
};

// 5. создаем компонент, с помощью которого будем получать доступ к библиотекам
export const AnimationProvider = ({ children }: {children: ReactNode}) => {
    // складываем внутрь ref-ов библиотеки
    // ref-ы создаем, чтобы от рендера к рендеру был доступ к значениям, но при этом не было лишних перерисовок
    const SpringRef = useRef<SpringType>();
    const GestureRef = useRef<GestureType>();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring;         // 6. Сохраняем в рефы то, что вернул нам асинхронный импорт
            GestureRef.current = Gesture;       //    т.е., теперь в этих рефах будут храниться библиотеки
            setIsLoaded(true);
        });
    }, []);

    // 7. Мемоизируем, т.к. дальше могут быть перерисовки (оборачиваем в скобки, т.к. возвращаем объект)
    const value = useMemo(() => ({
        Gesture: GestureRef.current,
        Spring: SpringRef.current,
        isLoaded,
    }), [isLoaded]);

    return (
        // 8. Передаем полученные данные в провайдер
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};
