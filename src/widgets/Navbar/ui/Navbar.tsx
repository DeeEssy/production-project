import { classNames } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useCallback, useState } from 'react';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  const onToggleAuthModal = useCallback(() => {
    setIsAuthModalVisible((prev) => !prev);
  }, []);

  return (
    <nav className={classNames(cls.navbar, {}, [className])}>
      <Button
        onClick={onToggleAuthModal}
        theme={ThemeButton.CLEAR_INVERTED}
        className={classNames(cls.links)}
      >
        {t('enter')}
      </Button>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <Modal isOpen={isAuthModalVisible} onClose={onToggleAuthModal}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Modal>
    </nav>
  );
};
