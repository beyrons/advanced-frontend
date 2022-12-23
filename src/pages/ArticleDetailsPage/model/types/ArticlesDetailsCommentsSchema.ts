import { EntityState } from '@reduxjs/toolkit';
import { Comments } from '@/entities/Comment';


export interface ArticlesDetailsCommentsSchema extends EntityState<Comments>{ // за счет наследования добавляем поля ids & etities
    isLoading?: boolean;                                                      // для селектора getArticleComments
    error?: string;
}
