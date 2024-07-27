import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';

import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

interface EditableProfileCardHeaderProps {
    className?: string;
    id: number;
}

export const EditableProfileCardHeader = memo(({ className, id }: EditableProfileCardHeaderProps) => {
  const { t } = useTranslation('profilePage');
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);
  const isLoading = useSelector(getProfileIsLoading);
  const user = useSelector(getUserAuthData);
  const isEditable = Number(id) === user?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(async () => {
    await dispatch(updateProfileData(Number(id)));
  }, [dispatch, id]);

  return (

    <Card padding="24" max border="sm-round">
      <HStack
        max
        justify="between"
        className={classNames('', {}, [className])}
      >
        <Text title={t('profile')} />
        {isEditable && (
        <div>
          {readonly ? (
            <Button
              onClick={onEdit}
              data-testid="profile-card-edit-btn"
            >
              {t('edit')}
            </Button>
          ) : (
            <HStack gap="8">
              <Button
                onClick={onCancelEdit}
                data-testid="profile-card-undo-btn"
                disabled={isLoading}
                color="error"
              >
                {t('undo')}
              </Button>
              <Button
                onClick={onSave}
                data-testid="profile-card-save-btn"
                disabled={isLoading}
                color="success"
              >
                {t('save')}
              </Button>
            </HStack>
          )}
        </div>
        )}
      </HStack>
    </Card>
  );
});
