import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  getIsUserAdmin,
  getUserAuthData, userActions,
} from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Dropdown, DropdownItem } from '@/shared/ui/Dropdown/Dropdown';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);
  const isUserAdmin = useSelector(getIsUserAdmin);

  const onLogout = useCallback(() => {
    dispatch(userActions.clearAuthData());
  }, [dispatch]);

  if (!authData) {
    return null;
  }

  const dropdownItems = (): DropdownItem[] => {
    const items = [
      {
        content: t('profile'),
        href: `${RoutePath.profile}/${authData.id}`,
      },
      {
        content: t('logout'),
        onClick: onLogout,
      },
    ];

    if (isUserAdmin) {
      items.unshift({
        content: t('admin'),
        href: RoutePath.admin_panel,
      });
    }

    return items;
  };

  return (
    <Dropdown
      className={classNames('', {}, [className])}
      direction="bottom left"
      items={dropdownItems()}
      trigger={<Avatar size={30} src={authData.avatar} />}
    />
  );
});
