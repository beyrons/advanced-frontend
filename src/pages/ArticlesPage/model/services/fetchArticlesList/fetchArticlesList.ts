import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getArticlePageLimit,
    getArticlePageNum,
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType,
} from '../../selectors/articlePageSelectors';


interface fetchArticlesListProps {
    replace?: boolean       // флаг: запрос идет по фильтрам
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    fetchArticlesListProps,
    ThunkConfig<string>
    >(
        'articlePage/fetchArticlesList',
        async (props, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;
            const limit = getArticlePageLimit(getState());  // getState -- для получения актуального state
            const page = getArticlePageNum(getState());
            const sort = getArticlePageSort(getState());
            const order = getArticlePageOrder(getState());
            const search = getArticlePageSearch(getState());
            const type = getArticlePageType(getState());

            try {
                addQueryParams({
                    sort, order, search, type,
                });
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _expand: 'user',    // оставляем для отрисовки аватарки
                        _limit: limit,      // https://github.com/typicode/json-server#paginate
                        _page: page,
                        _sort: sort,
                        _order: order,
                        q: search,          // https://github.com/typicode/json-server#full-text-search
                        type: type === ArticleType.ALL ? undefined : type,
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
