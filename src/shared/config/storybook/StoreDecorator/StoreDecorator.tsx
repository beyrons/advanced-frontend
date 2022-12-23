import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice';
import { addCommentFormReducer } from '@/features/addCommentForm/model/slice/addCommentFormSlice';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices';
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice';


// передаем асинхронные редюсеры
const defaultAsyncReducers: ReducerList = {
    loginForm: loginReducer,
    profile: profileReducer,    // инициализация по дефолту
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articlesDetailsPage: articleDetailsPageReducer,
};


// state: -- нужно для определения дефолтного стейта для сторис
// DeepPartial -- используем не саму стейт-схему, т.к., в ней много обязательных/ненужных полей
export const StoreDecorator = (
    state: DeepPartial<StateSchema>,    // eslint: 'no-undef': 'off'
    asyncReducer?: ReducerList,
) => (StoryComponent: Story) => (
    // <ThemeProvider> нужно для смены темы в модальном окне
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducer }}>
        <StoryComponent />
    </StoreProvider>
);
