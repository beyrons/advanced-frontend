// Описание State (описываем типы state, с которыми будем работать)
// т.к., в больших приложениях необходимо понимать структуру
import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { ArticleDetailsSchema } from '@/entities/Article';
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { AddCommentFormSchema } from '@/features/addCommentForm';
import { ArticlePageSchema } from '@/pages/ArticlesPage';
import { ScrollRestoreSchema } from '@/features/ScrollRestore';
import { rtkApi } from '@/shared/api/rtkApi';
import { ProfileSchema } from '@/features/editableProfileCard';


export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    scrollRestore: ScrollRestoreSchema;         // делаем обязательным, не забываем добавлять в store.ts
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    // Асинхронные редюсеры
    loginForm?: LoginSchema;                    // делаем необязательным, т.к. будем его добавлять с помощью reducerManager
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlePageSchema;
    articlesDetailsPage?: ArticleDetailsPageSchema;
}


// Достаем напрямую названия редюсеров для переменной "keysToRemove в "reducerManager"
// т.е., создаем массив ключей (названия редюсеров)
export type StateSchemaKey = keyof StateSchema;
// consts key: StateSchemaKey = 'loginForm' -- пример использования

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;           // возвращает объект с редюсерами
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;

    getMountedReducers: () => MountedReducers;                           // "Название редюсера", true - вмонтирован, false - не вмонтирован
}

// создаем отдельный тип для reducerManager
// EnhancedStore -- стандартный тип, который возвращается при создании стора
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

// создаем отдельный тип, для сокращения записи в 'createAsyncThunk', типа такой "..{rejectValue: string, extra: ThunkExtraArg}"
export interface ThunkConfig<T> {   // джинерик - тип для ошибки
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
