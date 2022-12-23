import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/userConsts';


// создаем общий селектор, который из сущности пользователя будет доставать массив ролей
export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

// Проверяем роль пользователя
// Чтобы каждый раз не пробегать по массиву ролей и не проверять,  с помощью "реселект" замемоизируем получение списка ролей
// и уже внутри самого селектора будем проверять, является ли пользователь админом или нет
export const isUserAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(UserRole.ADMIN)));
export const isUserManager = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(UserRole.MANAGER)));
