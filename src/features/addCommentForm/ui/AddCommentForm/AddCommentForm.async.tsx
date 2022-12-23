// асинхронная форма подгрузки комментариев
import { FC, lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(
    () => import('./AddCommentForm'),
);
