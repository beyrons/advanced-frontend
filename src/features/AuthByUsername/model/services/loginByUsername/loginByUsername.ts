import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';


interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(   // createAsyncThunk<Returned, ThunkArg = void>
    'login/loginByUsername',
    async (authData, thunkAPI) => {  // деструктуризируем "async (authData, thunkAPI)"
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<User>('/login', authData);  // json-server

            if (!response.data) {
                throw new Error();
            }

            // токен: авторизован или нет. При разлогировании будем удалять этот токен
            // PS. JSON.stringify -- т.к. в localStorage можно хранить только строки
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
