import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider'; // действие "paths": { "*": ["./src/*"]..." из tsconfig.json и + ThemeProvider/index.ts
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import '@/app/styles/index.scss';   // переносим из App из-за модального окна
import './shared/config/i18n/i18n'; // <- вид импорта https://react.i18next.com/latest/using-with-hooks
import { ErrorBoundary } from './app/providers/ErrorBoundary';


const container = document.getElementById('root');

if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать реакт приложение');
}

const root = createRoot(container);

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
