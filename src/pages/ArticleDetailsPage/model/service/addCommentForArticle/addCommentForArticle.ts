import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comments } from '@/entities/Comment';
import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails';
import {
    fetchCommentsByArticleId,
} from '../../service/fetchCommentsByArticleId/fetchCommentsByArticleId';


export const addCommentForArticle = createAsyncThunk<
    Comments,
    string,   // текст комментария будем принимать пропсом из Input'a. Т.о., избавляемся от зависимостей между модулей и "addCommentForArticle" становится независимой и ни от какой сущости не зависит
    ThunkConfig<string>
    >(   // createAsyncThunk<Returned, ThunkArg = void>
        'articleDetails/addCommentForArticle',
        async (text, thunkAPI) => {  // деструктуризируем "async (authData, thunkAPI)"
            const { extra, rejectWithValue, dispatch, getState } = thunkAPI;

            // формируем правильные данные для отправки на бэкэнд
            const userData = getUserAuthData(getState());
            const article = getArticleDetailsData(getState());

            if (!userData || !text || !article) {
                return rejectWithValue('error: data not a complete!');
            }

            try {
                const response = await extra.api.post<Comments>('/comments', {
                    articleId: article.id,
                    userId: userData.id,
                    text,

                });  // json-server

                if (!response.data) {
                    throw new Error();
                }

                // обновляем интерфес после отправки комментария
                dispatch(fetchCommentsByArticleId(article.id));


                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
