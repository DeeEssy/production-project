import { Suspense, memo } from 'react';

import { classNames } from '@/shared/lib';
import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/Loader';

import { LoginFormAsync as LoginForm } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = memo(({ className, isOpen, onClose }: LoginModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    className={classNames('', {}, [className])}
    lazy
  >
    <Suspense fallback={<Loader />}>
      <LoginForm onSuccess={onClose} />
    </Suspense>
  </Modal>
));
