import { classNames } from 'shared/lib';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { Locales } from 'shared/config/i18n/locales';
import cls from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === Locales.UA ? Locales.EN : Locales.UA);
  };

  return (
    <Button
      className={classNames(cls.languageSwitcher, {}, [className])}
      onClick={toggleLanguage}
      theme={ThemeButton.CLEAR}
    >
      {t('language')}
    </Button>
  );
};
