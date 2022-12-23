import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entities/Rating';

// пишем отдельные интерфейсы для принимаемых аргументов
// получение рейтинга
interface GetArticleRatingArg {
    userId: string;
    articleId: string;
}

// запись рейтинга
interface RateArticleArg {
    userId: string;         // как в схеме "article-ratings" в БД
    articleId: string;
    rate: number;
    feedback?: string;
}


const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetArticleRatingArg>({     // указываем типы, которые ожидаем
            query: ({ userId, articleId }) => ({
                // здесь настраиваем классический http-запрос
                url: '/article-ratings',        // json-server
                params: {
                    userId,                     // передаем аргументы в запрос, json по этим id найдет нам нужный объект и вернет его
                    articleId,
                },
            }),
        }),

        rateArticle: build.mutation<void, RateArticleArg>({       // записываем оценку в БД. void - т.к. не ожидаем ответ (возвращаемое значение)
            query: (arg) => ({
                url: '/article-ratings',
                method: 'POST',
                body: arg,          // здесь передаем QueryArg, который === RateArticleArg ("mutation<..., QueryArg>" - см.документацию по "build.mutation")
            }),
        }),
    }),
});

// экспортируем только хук, т.к. сам апи снаружи не нужен
export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
