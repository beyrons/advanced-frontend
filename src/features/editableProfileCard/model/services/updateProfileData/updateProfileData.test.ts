import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { ValidateProfileError } from '../../consts/consts';
import { updateProfileData } from './updateProfileData';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Russia,
    lastname: 'Ivanov',
    first: 'Ivan',
    city: 'Ekb',
    currency: Currency.RUB,
    id: '1',
};

describe('updateProfileData.test', () => {
    test('updateProfileData -- success', async () => {
        // передаем initialState - чтобы данные были валидные
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {      // используем "state?: DeepPartial<StateSchema>" из TestAsyncThunk
                form: data, // предаем данные о профиле
            },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();               // выполнился put-запрос
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });


    test('updateProfileData -- error', async () => {            // серверная ошибка AsyncThunk
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    });


    test('updateProfileData -- validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: { ...data, lastname: '' },
            },
        });
        // "мок" убираем, т.к., до него не дойдет
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });
});
