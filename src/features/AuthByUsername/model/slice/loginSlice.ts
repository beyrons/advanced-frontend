import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';


const initialState: LoginSchema = {
    isLoading: false,
    username: '',
    password: '',
};

const loginSlice = createSlice({      // "защищаем" State он рандомных полей дженериком
    name: 'login',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {   // PayloadAction -- тип внутри toolkit, что ожидаем внутри action
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },

    // extraReducers -- для того, чтобы изменять state
    // обычные редюсеры - для обычного изменения, extraReducers - для async thunk
    extraReducers: (builder) => {       // https://redux-toolkit.js.org/api/createAsyncThunk#checking-errors-after-dispatching
        builder
            // pending -- начало выполнения async-action
            .addCase(loginByUsername.pending, (state) => {
                state.error = undefined;    // обнуляем ошибку, если она была
                state.isLoading = true;     // включаем "крутилку"
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.isLoading = false;
                // action.payload.id;   // <-- все, как указывали в типах async-thunk
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
