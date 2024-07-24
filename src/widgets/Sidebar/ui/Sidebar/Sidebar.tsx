import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib';
import { VStack } from '@/shared/ui/Stack';
import { AppLogo } from '@/shared/ui/AppLogo';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '@/shared/ui/Icon';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems/getSidebarItems';
import cls from './Sidebar.module.scss';

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
      {!isSidebarCollapsed && <AppLogo className={cls.appLogo} />}
      <VStack role="navigation" gap="8" className={cls.items}>
        {itemsList}
      </VStack>
      <Icon
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        Svg={ArrowIcon}
        clickable
      />
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher short={isSidebarCollapsed} />
      </div>
    </div>
  );
});
