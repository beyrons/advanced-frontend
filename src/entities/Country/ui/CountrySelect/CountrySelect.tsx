import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui/Popups/components/ListBox/ListBox';
import { Country } from '../../model/types/country';


interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className, value, onChange, readonly,
    } = props;
    const { t } = useTranslation('profile');

    // мапим, т.к. несоответствие Country и string
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);


    return (
        <ListBox
            value={value}
            items={options}
            defaultValue={t('Укажите страну')}
            onChange={onChangeHandler}
            className={className}
            readonly={readonly}
            direction="bottom right"
            label={t('Страна')}
        />
    );
});
