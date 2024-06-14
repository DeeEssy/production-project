import { classNames } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
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
