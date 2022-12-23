// конфигурация переводов
// https://react.i18next.com/latest/using-with-hooks

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ru',
        debug: __IS_DEV__, // в "прод"-режиме отменить вывод дебага

        interpolation: {
            escapeValue: false,
        },
        backend: { // https://github.com/i18next/i18next-http-backend
            loadPath: '/locales/{{lng}}/{{ns}}.json', // путь для загрузки переводов
        },
    });

export default i18n;
