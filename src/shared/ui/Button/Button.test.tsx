import { render, screen } from '@testing-library/react';
import { Button, ButtonTheme } from './Button';

describe('Button', () => {  // создаем обертку для целой пачки тестов
    test('Test render', () => {
        render(<Button>test</Button>);
        expect(screen.getByText('test')).toBeInTheDocument();  // screen -- получение элементов со страницы
        // toBeIn.. -> библиотека testing-library/jest-dom@5.16.2  https://github.com/testing-library/jest-dom#installation
    });

    test('Test clear theme', () => {
        render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
        screen.debug();
    });
});
