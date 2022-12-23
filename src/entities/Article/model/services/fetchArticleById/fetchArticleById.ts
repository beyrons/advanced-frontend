// получаем статью по id
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';


export const fetchArticleById = createAsyncThunk<Article, string | undefined, ThunkConfig<string>>(
    'articleDetails/fetchArticleById',
    async (articleId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            if (!articleId) {
                throw new Error('');
            }

            const response = await extra.api.get<Article>(`/articles/${articleId}`, {
                params: {
                    // добавляем в response данные о встроенных свойствах 'user': теперь бэкэнд вернет полную инфу по пользователю
                    _expand: 'user',
                },
            });
            if (!response.data) {
                throw new Error('');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
