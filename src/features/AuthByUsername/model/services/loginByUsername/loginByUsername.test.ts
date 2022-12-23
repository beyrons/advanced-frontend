// import { Dispatch } from '@reduxjs/toolkit';
// import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

// любые запросы на сервер в тестах необходимо "мОкать"
// jest.mock('axios');

// jest для замоканных модулей добавляет функции по типу "mockReturnValue()"
// которые позволяют замокать какое-то возвращаемое значение.
// Но TypeScript по умолчанию эти функции не подхватывает и для этого можно воспользоваться
// следующей конструкцией:
// consts mockedAxios = jest.mocked(axios, true);     // первым аргументом мы передаем модуль, который хотим замокать
// вторым аргументом - флаг с глубоким моком, т.е. мокаем не только модуль, но и внутренние поля, например поле 'post'


describe('loginByUsername.test', () => {
    test('success login', async () => {
        const userValue = { username: 'user', id: '1' };

        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
        const result = await thunk.callThunk({ username: 'user', password: '123' });

        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        expect(result.payload).toEqual(userValue);
    });

    test('fail login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk({ username: 'user', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });

    // let dispatch: Dispatch;
    // let getState: () => StateSchema;     // стейт типа StateSchema
    //
    // // далее callback-ом мОкаем диспатч и гетстейт
    // beforeEach(() => {
    //     dispatch = jest.fn();
    //     getState = jest.fn();
    // });


    // test('success login', async () => {
    //     consts userValue = { username: 'user', id: '1' };
    //
    //     // мОкаем ответ от сервера
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
    //
    //     // loginByUsername - функция "createAsyncThunk", она создает асинхронный action(thunk). Потом мы этот экшен вызываем
    //     // и помещаем в 'result'
    //     consts action = loginByUsername({ username: 'user', password: '123' });
    //
    //     // передаем dispatch & state в экшон
    //     consts result = await action(dispatch, getState, undefined);  // undefined -- т.к. пока нет extra-аргумента
    //
    //     // == TESTS ==
    //     // Теперь, в зависимости от того, что мы в объекте получили, можем создавать различные тест-кейсы
    //     // например, что метод 'post' вызвался, т.е. запрос на сервер был отправлен:
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //
    //     // в экшене, в мета-информации requestStatus = "fulfilled", т.е. async-thunk отработал без ошибки
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //
    //     expect(dispatch).toHaveBeenCalledTimes(3);      // dispatch был вызван 3 раза
    //
    //     // проверяем thunkAPI.dispatch(userActions.setAuthData(response.data)) -- loginByUsername.ts;
    //     // с каким аргументом он принимается.
    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    //
    //     // возвращаются данные о пользователе
    //     expect(result.payload).toEqual(userValue);
    // });
    //
    // test('fail login', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));     // тестим запрос с ошибкой 403
    //     consts action = loginByUsername({ username: 'user', password: '123' });
    //     consts result = await action(dispatch, getState, undefined);
    //
    //     // == TESTS ==
    //     expect(dispatch).toHaveBeenCalledTimes(2);      // в случае ошибки dispatch был вызван 2 раза
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toBe('error');
    // });
});
