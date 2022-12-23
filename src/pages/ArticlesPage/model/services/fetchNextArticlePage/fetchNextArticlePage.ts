import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getArticlePageHasMore,
    getArticlePageIsLoading,
    getArticlePageNum,
} from '../../selectors/articlePageSelectors';
import { articlesPageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';


export const fetchNextArticlePage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
    >(
        'articlePage/fetchNextArticlePage',
        async (_, thunkApi) => {
            const { getState, dispatch } = thunkApi;

            // В первую очередь получаем флаг hasMore и передаем в переменную getState -- для получения актуального state
            const hasMore = getArticlePageHasMore(getState());
            // Получаем номер страницы
            const page = getArticlePageNum(getState());
            const isLoading = getArticlePageIsLoading(getState());

            // Далее переносим функционал "onLoadNextPart" из ArticlePage.tsx
            if (hasMore && !isLoading) {
                dispatch(articlesPageActions.setPage(page + 1));
                dispatch(fetchArticlesList({}));
            }
        },
    );
