import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';


// consts baseUrl = __IS_DEV__ ? 'http://localhost:8000' : 'https://production.ru';

export const $api = axios.create({
    baseURL: __API__,
});


// перед тем, как отправлять запрос, добавляем токен авторизации, который помещаем в header
$api.interceptors.request.use((config) => {
    if (config.headers) {   // добавляем только в том случае, если в конфиге есть заголовок
        config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    }

    return config;
});
