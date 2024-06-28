import { classNames } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();

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
    return (
      <nav className={classNames(cls.navbar, {}, [className])}>
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
        <Button
          onClick={onLogout}
          theme={ThemeButton.CLEAR_INVERTED}
          className={classNames(cls.links)}
        >
          {t('logout')}
        </Button>
      </nav>
    );
  }

  return (
    <nav className={classNames(cls.navbar, {}, [className])}>
      <Button
        onClick={onShowAuthModal}
        theme={ThemeButton.CLEAR_INVERTED}
        className={classNames(cls.links)}
      >
        {t('enter')}
      </Button>
      {isAuthModalVisible && (<LoginModal onClose={onCloseAuthModal} isOpen={isAuthModalVisible} />)}
    </nav>
  );
});
