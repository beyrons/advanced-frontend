import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '@/entities/Article';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({     // исправляем "any"
            query: (limit) => ({
                // здесь настраиваем классический http-запрос
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});

// экспортируем только хук, т.к. сам апи снаружи не нужен
export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;
