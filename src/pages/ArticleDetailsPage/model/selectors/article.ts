import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

export const getCanEditArticle = createSelector(
    getArticleDetailsData,      // получаем данные "interface Article"
    getUserAuthData,            // и пользователе -- UserSchema
    (article, user) => {
        if (!article || !user) {
            return false;
        }

        // сравниваем id-статьи и id-автора
        return article.user.id === user.id;
    },
);
