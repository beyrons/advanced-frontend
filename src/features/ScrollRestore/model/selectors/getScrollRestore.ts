import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';


export const getScrollRestore = (state: StateSchema) => state.scrollRestore.scroll;

export const getScrollRestoreByPath = createSelector(       // здесь возвращаем не весь объект, а отдельный учсток скролла
    getScrollRestore,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,                    // если значения нет, возвращаем 0
);
