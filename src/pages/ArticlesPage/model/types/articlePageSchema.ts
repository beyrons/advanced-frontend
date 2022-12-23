import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { SortOrder } from '@/shared/types';


export interface ArticlePageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;           // загружены все статьи


    // filters                  // https://github.com/typicode/json-server#sort
    view: ArticleView;
    order: SortOrder;
    sort: ArticleSortField;     // поле, по которому фильтруем
    search: string;
    type: ArticleType;          // поле для tabs

    _inited: boolean;           // инициализировался state или нет

}
