import { StateSchema } from '@/app/providers/StoreProvider';
import { getArticleCommentsIsLoading, getArticleCommentsError } from './comments';

describe('selectors comments.test', () => {
    test('selector @articleDetailsComments :: return true', () => {
        // consts state: DeepPartial<StateSchema> = {
        //     articleDetailsComments: {
        //         isLoading: true,
        //     },
        // };
        // expect(getArticleCommentsIsLoading(state as StateSchema)).toEqual(true);
    });

    test('selector @articleDetailsComments :: return error', () => {
        // consts state: DeepPartial<StateSchema> = {
        //     articleDetailsComments: {
        //         error: 'error',
        //     },
        // };
        // expect(getArticleCommentsError(state as StateSchema)).toEqual('error');
    });
});
