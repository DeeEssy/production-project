import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { LoginModal } from 'features/AuthByUsername';
import { classNames } from 'shared/lib';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { getIsUserAdmin, getUserAuthData, userActions } from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown, DropdownItem } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();
  const isUserAdmin = useSelector(getIsUserAdmin);

  const onShowAuthModal = useCallback(() => {
    setIsAuthModalVisible(true);
  }, []);
  const onCloseAuthModal = useCallback(() => {
    setIsAuthModalVisible(false);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.clearAuthData());
  }, [dispatch]);

  if (authData) {
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
      <header className={classNames(cls.navbar, {}, [className])}>
        <Text
          className={cls.appName}
          title={t('application_name')}
          theme={TextTheme.INVERTED}
        />
        <AppLink
          to={RoutePath.article_create}
          theme={AppLinkTheme.SECONDARY}
          className={cls.createBtn}
        >
          {t('create_article')}
        </AppLink>
        <Dropdown
          direction="bottom left"
          className={cls.dropdown}
          items={dropdownItems()}
          trigger={<Avatar size={30} src={authData.avatar} />}
        />
      </header>
    );
  }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <Button
        onClick={onShowAuthModal}
        theme={ThemeButton.CLEAR_INVERTED}
        className={classNames(cls.links)}
      >
        {t('enter')}
      </Button>
      {isAuthModalVisible && (<LoginModal onClose={onCloseAuthModal} isOpen={isAuthModalVisible} />)}
    </header>
  );
});
