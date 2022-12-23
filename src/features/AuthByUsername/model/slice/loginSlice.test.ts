import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = { username: 'user' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setUserName('user'),
        )).toEqual({ username: 'user' });      // возвращаем объект, т.к. редюсер возвращает кусочек state (toEqual - для объектов, toBe - для примитивов)
    });

    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = { password: 'password' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setPassword('password'),
        )).toEqual({ password: 'password' });
    });
});
