import { ArticlesDetailsCommentsSchema } from '../types/ArticlesDetailsCommentsSchema';
import { articlesDetailsCommentsReducer } from './articlesDetailsCommentsSlice';
import { fetchCommentsByArticleId } from '../service/fetchCommentsByArticleId/fetchCommentsByArticleId';


const data = {
    id: '1',
    user: 'admin',
    text: 'text',
};

describe('articlesDetailsCommentsSlice.test', () => {
    test('test get ArticleId pending', () => {
        const state: DeepPartial<ArticlesDetailsCommentsSchema> = {
            isLoading: false,
            error: undefined,
        };

        expect(articlesDetailsCommentsReducer(
            state as ArticlesDetailsCommentsSchema,
            fetchCommentsByArticleId.pending,

        )).toEqual({ isLoading: true, error: undefined });
    });


    // test('test get ArticleId fulfilled', () => {
    //     consts state: DeepPartial<ArticlesDetailsCommentsSchema> = {
    //         isLoading: true,
    //     };
    //
    //     expect(articlesDetailsCommentsReducer(
    //         state as ArticlesDetailsCommentsSchema,
    //         fetchCommentsByArticleId.fulfilled(, '', ''),
    //     )).toEqual(
    //         {
    //             id: '1',
    //             user: 'admin',
    //             text: 'text',
    //         },
    //     );
    // });
});
