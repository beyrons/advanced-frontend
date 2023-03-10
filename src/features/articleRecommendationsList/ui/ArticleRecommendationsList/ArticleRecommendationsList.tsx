import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleList } from '@/entities/Article';
import { Text } from '@/shared/ui/Text/Text';
import { VStack } from '@/shared/ui/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';


interface ArticleRecommendationsListProps {
    className?: string;
}


export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');

    const { isLoading, data: articles, error } = useArticleRecommendationsList(3);  // limit = 3. data: articles - переопределение названия
    if (isLoading || error || !articles) {
        return null;
    }


    return (
        <VStack gap="8" className={classNames('', {}, [className])}>
            <Text title={t('Похожие статьи')} />
            <ArticleList
                articles={articles}
                target="_blank"
            />
        </VStack>
    );
});
