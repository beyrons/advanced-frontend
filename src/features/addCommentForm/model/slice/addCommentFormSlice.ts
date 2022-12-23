import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/addCommentForm';


const initialState: AddCommentFormSchema = {
    text: '',
};

const addCommentFormSlice = createSlice({      // "защищаем" State он рандомных полей дженериком
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },

    // extraReducers -- для того, чтобы изменять state
    // обычные редюсеры - для обычного изменения, extraReducers - для async thunk
    // extraReducers: (builder) => {       // https://redux-toolkit.js.org/api/createAsyncThunk#checking-errors-after-dispatching
    //     builder
    //         // pending -- начало выполнения async-action
    //         .addCase(loginByUsername.pending, (state) => {
    //             state.error = undefined;    // обнуляем ошибку, если она была
    //             state.isLoading = true;     // включаем "крутилку"
    //         })
    //         .addCase(loginByUsername.fulfilled, (state) => {
    //             state.isLoading = false;
    //             // action.payload.id;   // <-- все, как указывали в типах async-thunk
    //         })
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
