import { classNames } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(cls.loginForm, {}, [className])}
    >
      <Input className={classNames(cls.input, {})} placeholder={t('enter_username')} autofocus />
      <Input className={classNames(cls.input, {})} placeholder={t('enter_password')} />
      <Button className={classNames(cls.loginBtn, {})}>{t('enter')}</Button>
    </div>
  );
};
