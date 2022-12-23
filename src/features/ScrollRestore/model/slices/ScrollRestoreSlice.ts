import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollRestoreSchema } from '../types/ScrollRestoreSchema';


const initialState: ScrollRestoreSchema = {
    scroll: {},
};

const ScrollRestoreSlice = createSlice({
    name: 'ScrollRestore',
    initialState,
    reducers: {
        // вместо action деструктуризиируем в { payload } для удобства чтения action...
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string, position: number}>) => {   // PayloadAction -- тип внутри toolkit, что ожидаем внутри action
            state.scroll[payload.path] = payload.position;   // т.е. добавляем position к ключу path
        },
    },

});

export const { actions: scrollRestoreActions } = ScrollRestoreSlice;
export const { reducer: scrollRestoreReducer } = ScrollRestoreSlice;
