import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown } from '@/shared/ui/Popups';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';


interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // скрываем кнопку админки для пользователей
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const authData = useSelector(getUserAuthData);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) {
        return null;
    }


    return (
        <Dropdown
            direction="bottom left"
            className={classNames('', {}, [className])}
            items={[    // скрываем админку для пользователей
                ...(isAdminPanelAvailable ? [{
                    content: t('Админ-панель'),
                    href: RoutePath.admin_panel,
                }] : []),
                {
                    content: t('Профиль'),
                    href: RoutePath.profile + authData.id,
                },
                {
                    content: t('Выйти'),
                    onCLick: onLogout,
                    href: RoutePath.main,
                },

            ]}
            // в качестве триггера указываем аватарку
            trigger={<Avatar size={30} src={authData.avatar} />}
        />
    );
});
