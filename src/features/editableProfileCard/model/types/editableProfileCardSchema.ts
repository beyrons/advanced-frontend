import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../consts/consts';

// схема как профиль будет храниться в State
export interface ProfileSchema {
    data?: Profile;
    form?: Profile;         // здесь храним, что отредактировал пользователь в профиле
    isLoading: boolean;
    error?: string;         // например, ошибка при редактировании профиля
    readonly: boolean;      // состояние, в котором определяем доступен пользователь для редактирования или нет
    validateErrors?: ValidateProfileError[];
}
