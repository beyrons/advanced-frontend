// описываем состояние для State, который будет отвечать за форму авторизации
export interface LoginSchema {
    username: string;
    password: string;
    isLoading: boolean;
    error?: string;
}
