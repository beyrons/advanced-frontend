import { StoreProvider } from '@/app/providers/StoreProvider/ui/StoreProvider';
import { AppDispatch, createReduxStore } from './config/store';
// импортируем схему из вышестоящего слоя, так делать нельзя, но в качестве исключений могут быть типы
import type { StateSchema, ThunkConfig } from './config/StateSchema';


export {
    StoreProvider,
    createReduxStore,           // пригодится для работы со store внутри storybook
};

export type {
    StateSchema,
    AppDispatch,
    ThunkConfig,
};
