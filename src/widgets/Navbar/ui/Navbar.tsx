import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onShowAuthModal = useCallback(() => {
    setIsAuthModalVisible(true);
  }, []);
  const onCloseAuthModal = useCallback(() => {
    setIsAuthModalVisible(false);
  }, []);

  if (authData) {
    return (
      <header
        className={classNames(cls.navbar, {}, [
          className,
        ])}
      >
        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <Button
        onClick={onShowAuthModal}
        variant="clear"
        className={classNames(cls.links)}
      >
        {t('enter')}
      </Button>
      {isAuthModalVisible && (<LoginModal onClose={onCloseAuthModal} isOpen={isAuthModalVisible} />)}
    </header>
  );
});
