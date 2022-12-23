// Чтобы не далеть импорт файла в каждый тест, создаем этот helper
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from '@/shared/config/i18n/i18nForTests';

// https://react.i18next.com/misc/testing
export function renderWithTranslation(component: ReactNode) {
    return render(
        <I18nextProvider i18n={i18nForTests}>
            {component}
        </I18nextProvider>,
    );
}
