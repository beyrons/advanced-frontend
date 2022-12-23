import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';
import { StateSchema } from '@/app/providers/StoreProvider';

// Return - тип, который возвращает thunk,
// Arg - аргумент,
// RejectedValue - то, что возвращает thunk в случае ошибки
// пример: "export consts loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>" (loginByUsername.ts)


type ActionCreatorType<Return, Arg, RejectedValue> =
    (arg: Arg) => AsyncThunkAction<Return, Arg, {rejectValue: RejectedValue}>      // === AsyncThunkAction<Returned, ThunkArg, ThunkApiConfig> (createAsyncThunk.ts)

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>;
    getState: () => StateSchema;
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

    // замОкаем экстра-аргумент
    api: jest.MockedFunctionDeep<AxiosStatic>;
    navigate: jest.MockedFn<any>;

    constructor(
        actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,    // actionCreator == async-thunk
        state?: DeepPartial<StateSchema>,                                // для тестовых сценариев, задаем дефолтное значение state
    ) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn(() => state as StateSchema);             // getState возвращает нам state

        this.api = mockedAxios;
        this.navigate = jest.fn();
    }

    // вызываем асинхронный экшен
    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg);
        const result = await action(
            this.dispatch,
            this.getState,
            { api: this.api, navigate: this.navigate },
        );

        return result;
    }
}
