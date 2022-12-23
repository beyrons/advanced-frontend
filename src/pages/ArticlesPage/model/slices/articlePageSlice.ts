import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article, ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrder } from '@/shared/types';
import { ArticlePageSchema } from '../types/articlePageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';


const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,      // по этому полю будет идти нормализация
});

// селектор (адаптер, который автоматически генерирует селекторы)
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlePageSlice = createSlice({
    name: 'articlePageSlice',
    initialState: articlesAdapter.getInitialState<ArticlePageSchema>({  // добавляем дженериком недостающие поля
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.SMALL,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        search: '',
        type: ArticleType.ALL,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {       // реализуем редюсер, при помощи котого будем переключать view
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {            // реализуем пагинацию
            state.page = action.payload;
        },

        // filters
        setOrder: (state, action: PayloadAction<SortOrder>) => {        // тип сортировки
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {  // сортировка
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {          // поиск
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {  // типы статей
            state.type = action.payload;
        },

        initState: (state) => {
            const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;    // кастуем к нужному enum, т.к. LS умеет хранить тотлько строки
            state.view = view;
            state.limit = view === ArticleView.BIG ? 4 : 9;             // количество плиток страниц
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                // Также обрабатываем pending, если флаг "replace" включен - очищаем массив
                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;   // если нам прилетел массив, в котором есть хотя бы один элемент, то мы считаем, что на сервере данные еще есть

                if (action.meta.arg.replace) {                          // setAll перезатирает данные, addMany - добавляет в конец
                    articlesAdapter.setAll(state, action.payload);      // запрос по фильтрам, через meta обращаемся к свойству AsyncThunk fetchArticlesList
                } else {
                    articlesAdapter.addMany(state, action.payload);     // обычный запрос
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions,
} = articlePageSlice;
