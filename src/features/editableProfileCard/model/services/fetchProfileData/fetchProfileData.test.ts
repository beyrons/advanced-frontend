import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Russia,
    lastname: 'Ivanov',
    first: 'Ivan',
    city: 'Ekb',
    currency: Currency.RUB,
};

describe('fetchProfileData.test', () => {
    test('fetchProfileData success', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));  // мокаем get-запрос и ожидаем, что "прилетает" схема из consts data

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();                  // ожидаем, что вызвался get-запрос
        expect(result.meta.requestStatus).toBe('fulfilled');       // ожидаем, что AsyncThunk выполнился со статусом 'fulfilled'
        expect(result.payload).toEqual(data);                      // ожидаем, что AsyncThunk возвращает нужный payload
    });

    test('fetchProfileData fail', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');         // ожидаем, что AsyncThunk выполнился со статусом 'rejected'
    });
});
