import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { fetchNextArticlePage } from './fetchNextArticlePage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// замокаем ArticleList
jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlePage.test', () => {
    test('fetchNextArticlePage success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            // передаем initialState, котрые будут перед началом тестирования
            // Т.е., проверяем кейс, когда все данные подготовлены, должен измениться номер страницы и должен вызваться запрос за данными
            articlesPage: {         // <-- ArticlePageSchema
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
            },
        });
        await thunk.callThunk();

        // проверяем, что вызвался 4 раза: pending, fulfilled и два диспатча внутри AsyncThunk(fetchNextArticlePage)
        expect(thunk.dispatch).toBeCalledTimes(4);

        // функция "fetchArticlesList" (в "fetchNextArticlePage") была вызвана с нужным для нас аргументом
        expect(fetchArticlesList).toHaveBeenCalled();
    });


    // Новый сценарий, когда hasMore или isLoading не подходят под условия, которые внутри экшэна и новая порция данных не подгружается
    test('fetchNextArticlePage not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
            },
        });
        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);          // т.е., только pending и fulfilled
        expect(fetchArticlesList).not.toHaveBeenCalled();   // fetchArticlesList не вызвался
    });
});
