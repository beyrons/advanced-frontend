import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('Sidebar', () => { // describe компонента
    test('работа Sidebar', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('class collapsed', () => {
        componentRender(<Sidebar />);
        const toggleBtn = screen.getByTestId('sidebar-toogle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        // fireEvent - с помощью которого можно генерировать какие-либо события. Нажимаем на кнопку
        fireEvent.click(toggleBtn);
        // проеряем, что на Sidebar накинулся класс "collapsed" и Sidebar визуально свернут
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
