import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';


const ForbiddenPage = memo(() => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('Доступ запрещен')}
        </Page>
    );
});

export default ForbiddenPage;
