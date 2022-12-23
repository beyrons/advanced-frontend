import {
    createEntityAdapter,
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { Comments } from '@/entities/Comment';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
    fetchCommentsByArticleId,
} from '../service/fetchCommentsByArticleId/fetchCommentsByArticleId'; // путь на относительный, тк.к импорт из соседней папки
import { ArticlesDetailsCommentsSchema } from '../types/ArticlesDetailsCommentsSchema';


const commentsAdapter = createEntityAdapter<Comments>({
    selectId: (comment) => comment.id,      // по этому полю будет идти нормализация
});

// селектор
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articlesDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const articlesDetailsCommentsSlice = createSlice({
    name: 'ArticlesDetailsCommentsSlice',
    initialState: commentsAdapter.getInitialState<ArticlesDetailsCommentsSchema>({  // добавляем дженериком недостающие поля
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (
                state,
                action: PayloadAction<Comments[]>,
            ) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articlesDetailsCommentsReducer } = articlesDetailsCommentsSlice;
