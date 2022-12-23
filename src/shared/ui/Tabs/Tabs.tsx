import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';


export interface TabsItem {
    value: string;
    content: ReactNode;                     // контент
}

interface TabsProps {
    className?: string;
    tabs: TabsItem[];
    value: string;                          // выбранный tab
    onTabClick: (tab: TabsItem) => void;    // переключение табов
}


export const Tabs = memo((props: TabsProps) => {
    const { className, tabs, value, onTabClick } = props;

    const clickHandler = useCallback((tab: TabsItem) => () => {
        onTabClick(tab);    // замыкание делаем для того, чтобы передать tab, т.к при обыной функции передается только event
    }, [onTabClick]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    key={tab.value}
                    className={cls.tab}
                    onClick={clickHandler(tab)}
                    // подсвечиваем выбранный tab
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
