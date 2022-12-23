import {
    AnyAction, combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { MountedReducers, ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';

// https://redux.js.org/usage/code-splitting


export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {     // Типизируем также, как и "rootReducer"
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: StateSchemaKey[] = [];                       // редюсеры, которые хотим удалить

    const mountedReducers: MountedReducers = {};

    return {
        getReducerMap: () => reducers,                             // возвращает редюсеры
        getMountedReducers: () => mountedReducers,

        reduce: (state: StateSchema, action: AnyAction) => {       // по сути эта функция и есть редюсер
            if (keysToRemove.length > 0) {
                state = { ...state };

                keysToRemove.forEach((key) => {                    // удаляем ненужные редюсеры
                    delete state[key];
                });
                keysToRemove = [];                                 // очищаем массив
            }
            return combinedReducer(state, action);                 // возвращаем новый редюсер, удалив помеченные на удаление "keysToRemove"
        },

        add: (key: StateSchemaKey, reducer: Reducer) => {          // добавляем редюсер по ключу
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;
            mountedReducers[key] = true;
            combinedReducer = combineReducers(reducers);
        },

        remove: (key: StateSchemaKey) => {                          // добавляем в массив редюсеры на удаление
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];
            keysToRemove.push(key);
            mountedReducers[key] = false;
            combinedReducer = combineReducers(reducers);
        },
    };
}
