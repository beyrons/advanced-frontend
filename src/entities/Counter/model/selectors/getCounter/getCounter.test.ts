// возвращает именно тот участок State, который мы ожидаем
import { StateSchema } from '@/app/providers/StoreProvider';
import { getCounter } from './getCounter';

describe('getCounter', () => {
    test('should return counter', () => {
        // аргументом селектор всегда принимает State, для этого создаем
        // переменную и объявим только часть DeepPartial - позволяет игнорировать поля
        // и использовать только те, которые необходимы
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        expect(getCounter(state as StateSchema)).toEqual({ value: 10 });    // as StateSchema для TypeScript
    });
});
