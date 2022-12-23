import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { User, UserSchema } from '../types/user';


const initialState: UserSchema = {
    _inited: false,
};

const userSlice = createSlice({      // "защищаем" State он рандомных полей дженериком
    name: 'user',
    initialState,
    reducers: {
        // определяем, пользователь авторизован или нет
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },

        // реализуем логику, по которой пользователь закрыл вкладку в браузере, потом опять открыл
        // и нам необходимо определить, что он авторизован. Достаем данные из localStorage
        // initAuthData -- вызываем в корне приложения (App.tsx)
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                // помещаем данные из localStorage в state
                state.authData = JSON.parse(user); // распарсиваем обратно из строки в JS-объект
            }
            state._inited = true;
        },

        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
