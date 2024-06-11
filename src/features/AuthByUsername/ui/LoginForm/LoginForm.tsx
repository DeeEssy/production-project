import { classNames } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import cls from './LoginForm.module.scss';
import { loginActions } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    username, password, error, isLoading,
  } = useSelector(getLoginState);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginSubmit = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, username, password]);

  return (
    <div
      className={classNames(cls.loginForm, {}, [className])}
    >
      <Text title={t('login_form')} />
      {error && <Text text={t('error.wrong_username_or_password')} theme={TextTheme.ERROR} />}
      <Input
        value={username}
        onChange={onChangeUsername}
        className={classNames(cls.input, {})}
        placeholder={t('enter_username')}
        autofocus
      />
      <Input
        value={password}
        onChange={onChangePassword}
        className={classNames(cls.input, {})}
        placeholder={t('enter_password')}
      />
      <Button
        onClick={onLoginSubmit}
        theme={ThemeButton.OUTLINE}
        disabled={isLoading}
        className={classNames(cls.loginBtn, {})}
      >
        {t('enter')}
      </Button>
    </div>
  );
});
