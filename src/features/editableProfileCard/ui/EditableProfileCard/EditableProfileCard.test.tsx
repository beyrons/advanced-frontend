import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { $api } from '@/shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';


const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 465,
    currency: Currency.USD,
    country: Country.Kazakhstan,
    city: 'Moscow',
    username: 'admin213',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: { id: '1', username: 'admin' },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('features/EditableProfileCard', () => {
    test('switch mode "readonly"', async () => {
        componentRender(<EditableProfileCard id="1" />, options);                                   // EditableProfileCard -- указываем, какой компонент будем рендерить
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));          // клик по кнопке "Редактировать"
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();   // действие действительно происходит
    });

    // test('При отмене значения должны обнуляться', async () => {
    //     componentRender(<EditableProfileCard id="1" />, options);
    //
    //     // расписываем алгоритм действий: сначала вводим занчение, потом нажимаем "отмена", получаем прежнее значение "admin"
    //     await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    //
    //     // очищаем значения в инпуте
    //     await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    //     await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));
    //
    //     await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');                   // user -- то, что пишем в input
    //     await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');
    //
    //     // значение попало в input
    //     expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
    //     expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');
    //
    //     // жмем на кнопку "отмена"
    //     await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));
    //
    //     expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
    //     expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
    // });
});
