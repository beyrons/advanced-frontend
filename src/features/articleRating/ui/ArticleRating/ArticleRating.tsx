import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';


export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}


const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation('article-details');

    // получаем данные рейтинга с сервера
    const userData = useSelector(getUserAuthData);
    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',                     // ?? '' -- т.к. userData может быть "undefined"
    });


    // === Сохраняем рейтинг === //

    // мутации используются немного подругому
    // хук возвращает массив, состоящий из двух элементов:
    // первый - функция, которая вызывает мутацию
    // второй - объект с настройками
    const [rateArticleMutation] = useRateArticle();     // rateArticleMutation -- сборная солянка (имя) от RTK-Query из "rateArticle"

    // по сути в обоих функция один и тот же запрос, в одном случае будет feedback, в другом нет
    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            // rateArticleMutation  -- запрос и в нем потенциально может возникнуть ошибка
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starsCount,
                feedback,
            });
        } catch (e) {
            console.log(e);
        }
    }, [articleId, rateArticleMutation, userData?.id]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback);
    }, [handleRateArticle]);

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount);
    }, [handleRateArticle]);

    // === end "сохраняем данные" === //


    // достаем полученные данные:
    const rating = data?.[0];                           // если статья еще не оценена, то будет "undefined"

    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            className={className}
            title={t('Оцените статью')}
            feedbackTitle={t('Оставьте свой отзыв о статье')}
            hasFeedback
        />
    );
});

export default ArticleRating;   // lazy-component
