import { classNames } from 'shared/lib';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();

  return (
    <nav className={classNames(cls.navbar, {}, [className])}>
      <div className={classNames(cls.links)}>
        <AppLink to={routeConfig.main.path} theme={AppLinkTheme.SECONDARY}>
          {t('navbar_mainPage_link_text')}
        </AppLink>
        <AppLink to={routeConfig.about.path} theme={AppLinkTheme.SECONDARY}>
          {t('navbar_aboutPage_link_text')}
        </AppLink>
      </div>
    </nav>
  );
};
