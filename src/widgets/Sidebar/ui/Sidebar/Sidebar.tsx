import { classNames } from 'shared/lib';
import { useState } from 'react';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
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
      className={classNames(
        cls.sidebar,
        { [cls.collapsed]: isSidebarCollapsed },
        [className],
      )}
    >
      <div className={cls.switchers}>
        <ThemeSwitcher className={classNames(cls.themeSwitcher)} />
        <LanguageSwitcher className={classNames(cls.languageSwitcher)} />
      </div>
      <button onClick={onToggle}>{t('sidebar_toggle_btn')}</button>
    </div>
  );
}
