import { UserRole } from '../consts/userConsts';


export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
}


// интерфейс для state, "сущность" пользователя
export interface UserSchema {
    authData?: User;  // authData == '', то пользователь не авторизован
    _inited?: boolean;  // _ - этот флаг нельзя менять
}
