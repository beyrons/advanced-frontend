import { CounterSchema } from '../types/CounterSchema';
import { counterActions, counterReducer } from './counterSlice';

describe('counterSlice.test', () => {
    test('decrement', () => {
        const state: CounterSchema = { value: 10 }; // здесь ожидаем не весь state, а конкретный участок

        // редюсер чистая функция, которая первым аргументом принимает state, а вторым - actions
        expect(counterReducer(state, counterActions.decrement)).toEqual({ value: 9 });
    });

    test('increment', () => {
        const state: CounterSchema = { value: 10 }; // здесь ожидаем не весь state, а конкретный участок
        expect(counterReducer(state, counterActions.increment)).toEqual({ value: 11 });
    });

    // полезно добавлять тест, который проверяет работоспособность редюсера и экшена при пустом state
    test('пустой state', () => {
        expect(counterReducer(undefined, counterActions.increment)).toEqual({ value: 1 });
    });
});
