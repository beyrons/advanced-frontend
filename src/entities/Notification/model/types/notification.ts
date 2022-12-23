export interface Notification {     // описываем объект уведомления
    id: string;
    title: string;          // заголовок
    description: string;    // описание
    href?: string;          // ссылка (опционально)
}
