import { classNames } from 'shared/lib';
import { memo, useMemo, useState } from 'react';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { Button, ButtonSize, ThemeButton } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { HStack, VStack } from 'shared/ui/Stack';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems/getSidebarItems';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => setIsSidebarCollapsed((value) => !value);

  const itemsList = useMemo(() => sidebarItemsList.map((item) => (
    <SidebarItem
      key={item.path}
      item={item}
      collapsed={isSidebarCollapsed}
    />
  )), [sidebarItemsList, isSidebarCollapsed]);

  return (
    <div
      data-testid="sidebar"
      className={classNames(
        cls.sidebar,
        { [cls.collapsed]: isSidebarCollapsed },
        [className],
      )}
    >
      <VStack role="navigation" gap="8" className={cls.items}>
        {itemsList}
      </VStack>
      <HStack justify="center" max className={cls.switchers}>
        <ThemeSwitcher className={classNames(cls.themeSwitcher)} />
        <LanguageSwitcher short={isSidebarCollapsed} className={classNames(cls.languageSwitcher)} />
      </HStack>
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
