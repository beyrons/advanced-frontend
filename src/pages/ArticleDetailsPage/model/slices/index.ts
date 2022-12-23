import { combineReducers } from '@reduxjs/toolkit';
import {
    articleDetailsPageRecommendationsReducer,
} from './articleDetailsPageRecommendationsSlice';
import { articlesDetailsCommentsReducer } from './articlesDetailsCommentsSlice';
import { ArticleDetailsPageSchema } from '../types';


// объединяем редюсеры Comments & Recommendations
export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articlesDetailsCommentsReducer,
});
