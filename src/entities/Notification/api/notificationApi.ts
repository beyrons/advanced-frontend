import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';


const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], null>({     // исправляем "any"
            query: () => ({
                // здесь настраиваем классический http-запрос
                url: '/notifications',      // json-server
            }),
        }),
    }),
});

// экспортируем только хук, т.к. сам апи снаружи не нужен
export const useNotifications = notificationApi.useGetNotificationsQuery;
