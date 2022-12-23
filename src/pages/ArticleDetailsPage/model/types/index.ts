import { ArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema';
import { ArticlesDetailsCommentsSchema } from './ArticlesDetailsCommentsSchema';


// группируем схемы (типы)
export interface ArticleDetailsPageSchema {
    comments: ArticlesDetailsCommentsSchema;
    recommendations: ArticleDetailsRecommendationsSchema;
}
