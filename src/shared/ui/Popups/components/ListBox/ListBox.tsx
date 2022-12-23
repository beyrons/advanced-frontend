import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';
import { HStack } from '../../../Stack';
import cls from './ListBox.module.scss';
import { Button } from '../../../Button/Button';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';


export interface ListBoxItem {
    value: string;              // идентификатор, определяющий элемент списка
    content: ReactNode;         // передаем не только строки, но, например, иконки
    disabled?: boolean;         // отключаем пункт меню
}

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;             // выбранный элемент, соответствует пункту меню
    defaultValue?: string;      // если элемент не быбран
    onChange: (value: string) => void;     // handler с помощью которго переключаем элементы списка. Исходный тип джинерик. Отработает, если только value === undefined
    readonly?: boolean;
    direction?: DropDownDirection;
    label?: string;
}


export function ListBox(props: ListBoxProps) {
    const { items, className, value, defaultValue, onChange, readonly, direction = 'bottom right', label } = props;

    // определяем, куда будет выпадать dropdown. Создаем массив дополнительных классов
    const optionsClasses = [mapDirectionClass[direction]];


    return (
        <HStack gap="4">
            {label && <span>{label}</span>}

            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
                value={value}
                onChange={onChange}
            >

                <HListBox.Button as="div" className={cls.trigger}>
                    <Button type="button" disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>

                <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {/* добавляем подсветку выбранного элемента */}
                            {({ active, selected }) => (
                                <li className={classNames(cls.item, {
                                    [popupCls.active]: active,
                                    [popupCls.disabled]: item.disabled,
                                })}
                                >
                                    {selected}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>

    );
}
