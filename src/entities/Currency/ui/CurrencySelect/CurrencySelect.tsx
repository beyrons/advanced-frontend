import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui/Popups/components/ListBox/ListBox';
import { Currency } from '../../model/types/currency';


interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
    { value: Currency.EUR, content: Currency.EUR },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className, value, onChange, readonly,
    } = props;
    const { t } = useTranslation('profile');

    // мапим, т.к. несоответсвие Currency и string
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);


    return (
        <ListBox
            value={value}
            items={options}
            defaultValue={t('Укажите валюту')}
            onChange={onChangeHandler}
            className={className}
            readonly={readonly}
            direction="bottom right"
            label={t('Валюта')}
        />
    );
});
