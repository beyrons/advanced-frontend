// == Конфигурация REDUX ==
// https://redux.js.org/tutorials/quick-start#create-a-redux-store

import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { $api } from '@/shared/api/api';
import { scrollRestoreReducer } from '@/features/ScrollRestore';
import { rtkApi } from '@/shared/api/rtkApi';
import { createReducerManager } from './reducerManager';
import { StateSchema, ThunkExtraArg } from './StateSchema';


export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        // в корневом редюсере оставляем только обязательные редюсеры
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
        scrollRestore: scrollRestoreReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    // Согласно концепции https://redux.js.org/usage/code-splitting :
    // Для разделения кода с помощью Redux мы хотим иметь возможность динамически добавлять редукторы в хранилище

    const reducerManager = createReducerManager(rootReducer);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,         // https://redux.js.org/usage/code-splitting
        devTools: __IS_DEV__,                   // метка для сборки: develop or product
        preloadedState: initialState,

        // у AsyncThunk(thunkAPI) есть аргумент 'extra', в который можно расположить любые вспомогательные
        // функции, данные, etc. Разместим в него инстанс API, чтобы не импортировать его каждый раз с async-thunk:
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }).concat(rtkApi.middleware),
    });

    // Добавляем reducerManager к Store
    // пока заигнорим, т.к. в store нет такого поля, чтобы TS не ругался
    // @ts-ignore
    store.reducerManager = reducerManager;      // грубо говоря, добавили новое поле в store

    return store;
}


// Создаем тип для dispatch, чтобы при его использовании автоматически подхватывались все типы для всех actions
// https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
// export type AppDispatch = typeof store.dispatch
// Но, поскольку сотр создается в рамках функции "createReduxStore", то снаружи получить диспатч таким образом "typeof store.dispatch" нельзя
// Поэтому, используем ReturnType - это тип для стора. Для получения типа для диспатча добавляем ['dispatch']
// После этого, добавляем "AppDispatch" в publicAPI (index.ts)

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
