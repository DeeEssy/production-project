import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
  { value: Country.Germany, content: Country.Germany },
  { value: Country.UK, content: Country.UK },
  { value: Country.USA, content: Country.USA },
  { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo(({
  className, value, onChange, readonly,
}: CountrySelectProps) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
    <ListBox
      label={t('your_country')}
      items={options}
      defaultValue={t('your_country')}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
      direction="top"
    />
  );
});
