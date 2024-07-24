import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib';
import { Locale } from '@/shared/config/i18n/locales';

interface LanguageSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LanguageSwitcher = memo(({ className, short }: LanguageSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === Locale.UA ? Locale.EN : Locale.UA);
  };

  return (
    <Button
      className={classNames('', {}, [className])}
      onClick={toggleLanguage}
      variant="clear"
    >
      {short ? i18n.language.toUpperCase() : t('language')}
    </Button>
  );
});
