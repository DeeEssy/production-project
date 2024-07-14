import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames, DynamicModuleLoader, ReducerList } from '@/shared/lib';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text, TextTheme } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducerList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginSubmit = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, username, password, onSuccess]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <form
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
      </form>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
