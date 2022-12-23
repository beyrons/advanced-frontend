import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import cls from './ArticleEditPage.module.scss';


interface ArticleEditPageProps {
    className?: string;
}


const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id); // есть id, значит редактируем


    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            { isEdit
                ? t('Редактирование статьи, ID=') + id
                : t('Новая статья')}
        </Page>
    );
});

export default ArticleEditPage;
