import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getUserAuthData } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from 'shared/ui/Stack';

import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(({ className }: EditableProfileCardHeaderProps) => {
  const { t } = useTranslation('profilePage');
  const { id: profileId } = useParams<{id: string}>();
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);
  const isLoading = useSelector(getProfileIsLoading);
  const user = useSelector(getUserAuthData);
  const isEditable = Number(profileId) === user?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(async () => {
    await dispatch(updateProfileData(Number(profileId)));
  }, [dispatch, profileId]);

  return (
    <HStack max justify="between" className={classNames('', {}, [className])}>
      <Text title={t('profile')} />
      { isEditable && (
        readonly
          ? (
            <Button
              theme={ThemeButton.OUTLINE}
              onClick={onEdit}
            >
              {t('edit')}
            </Button>
          )
          : (
            <HStack gap="8">
              <Button
                theme={ThemeButton.OUTLINE_RED}
                onClick={onCancelEdit}
                disabled={isLoading}
              >
                {t('undo')}
              </Button>
              <Button
                theme={ThemeButton.OUTLINE}
                onClick={onSave}
                disabled={isLoading}
              >
                {t('save')}
              </Button>
            </HStack>
          )
      )}
    </HStack>
  );
});
