import { classNames } from 'shared/lib';
import { useState } from 'react';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { Button, ButtonSize, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutPageIcon from 'shared/assets/icons/about-20-20.svg';
import MainPageIcon from 'shared/assets/icons/main-20-20.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { t } = useTranslation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const onToggle = () => setIsSidebarCollapsed((value) => !value);

  return (
    <div
      data-testid="sidebar"
      className={classNames(
        cls.sidebar,
        { [cls.collapsed]: isSidebarCollapsed },
        [className],
      )}
    >
      <div className={cls.items}>
        <AppLink
          className={cls.item}
          to={RoutePath.main}
          theme={AppLinkTheme.SECONDARY}
        >
          <MainPageIcon className={cls.icon} />
          <span
            className={cls.link}
          >
            {t('navbar_mainPage_link_text')}
          </span>
        </AppLink>
        <AppLink
          className={cls.item}
          to={RoutePath.about}
          theme={AppLinkTheme.SECONDARY}
        >
          <AboutPageIcon className={cls.icon} />
          <span
            className={cls.link}
          >
            {t('navbar_aboutPage_link_text')}
          </span>
        </AppLink>
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher className={classNames(cls.themeSwitcher)} />
        <LanguageSwitcher short={isSidebarCollapsed} className={classNames(cls.languageSwitcher)} />
      </div>
      <Button
        className={cls.collapseBtn}
        data-testid="sidebar-toggle"
        onClick={onToggle}
        theme={ThemeButton.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
      >
        {isSidebarCollapsed ? '>' : '<'}
      </Button>
    </div>
  );
}
