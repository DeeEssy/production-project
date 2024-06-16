import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import {
  getProfileIsLoading,
  getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { memo, useCallback } from 'react';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = memo(({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation('profilePage');
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);
  const isLoading = useSelector(getProfileIsLoading);

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(async () => {
    await dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={classNames(cls.profilePageHeader, {}, [className])}>
      <Text title={t('profile')} />
      {readonly
        ? (
          <Button
            className={cls.editBtn}
            theme={ThemeButton.OUTLINE}
            onClick={onEdit}
          >
            {t('edit')}
          </Button>
        )
        : (
          <>
            <Button
              className={cls.editBtn}
              theme={ThemeButton.OUTLINE_RED}
              onClick={onCancelEdit}
              disabled={isLoading}
            >
              {t('undo')}
            </Button>
            <Button
              className={cls.saveBtn}
              theme={ThemeButton.OUTLINE}
              onClick={onSave}
              disabled={isLoading}
            >
              {t('save')}
            </Button>
          </>
        )}
    </div>
  );
});
