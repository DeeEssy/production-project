import { FC, ReactNode } from 'react';

import { useTheme } from '@/app/providers/ThemeProvider';
import { classNames } from '@/shared/lib';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = (props) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    lazy,
  } = props;
  const { theme } = useTheme();

  const { isClosing, isMounted, close } = useModal({
    onClose,
    isOpen,
    animationDelay: ANIMATION_DELAY,
  });

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(
          cls.Modal,
          { [cls.opened]: isOpen, [cls.isClosing]: isClosing },
          [className, theme],
        )}
      >
        <div
          className={classNames(cls.content)}
        >
          { children }
        </div>
        <Overlay onClick={close} />
      </div>
    </Portal>
  );
};
