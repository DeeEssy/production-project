import { classNames } from 'shared/lib';
import { memo, useState } from 'react';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { Button, ButtonSize, ThemeButton } from 'shared/ui/Button/Button';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { SidebarItemsList } from '../../model/items';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
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
        {SidebarItemsList.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            collapsed={isSidebarCollapsed}
          />
        ))}
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
});
