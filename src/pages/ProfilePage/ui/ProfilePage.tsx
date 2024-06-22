import {
  ProfileCard, fetchProfileData, profileReducer, getProfileIsLoading, getProfileError,
  profileActions,
  getProfileReadonly,
  getProfileForm,
  getProfileValidateErrors,
  ValidateProfileError,
} from 'entities/Profile';

import {
  memo, useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducerList } from 'shared/lib';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const initialReducers: ReducerList = {
  profile: profileReducer,
};

const ProfilePage = memo(() => {
  const { t } = useTranslation('profilePage');
  const { id } = useParams<{id: string}>();
  const dispatch = useAppDispatch();
  const profileForm = useSelector(getProfileForm);
  const profileIsLoading = useSelector(getProfileIsLoading);
  const profileError = useSelector(getProfileError);
  const profileReadonly = useSelector(getProfileReadonly);
  const profileValidateErrors = useSelector(getProfileValidateErrors);

  const validateErrorTranslations = useMemo(() => ({
    [ValidateProfileError.INCORRECT_AGE]: t('error_incorrect_age'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('error_incorrect_country'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('error_user_data'),
    [ValidateProfileError.NO_DATA]: t('error_no_data'),
    [ValidateProfileError.SERVER_ERROR]: t('error_server_error'),
    [ValidateProfileError.INCORRECT_CURRENCY]: t('error_incorrect_currency'),
    [ValidateProfileError.INCORRECT_CITY]: t('error_incorrect_city'),
    [ValidateProfileError.INCORRECT_USERNAME]: t('error_incorrect_username'),
    [ValidateProfileError.INCORRECT_AVATAR]: t('error_incorrect_avatar'),
  }), [t]);

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(Number(id)));
    }
  });

  const onChangeFirstname = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ firstname: value }));
  }, [dispatch]);

  const onChangeLastname = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ lastname: value }));
  }, [dispatch]);

  const onChangeAge = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ age: +value }));
  }, [dispatch]);

  const onChangeCity = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ city: value }));
  }, [dispatch]);

  const onChangeAvatar = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ avatar: value }));
  }, [dispatch]);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ username: value }));
  }, [dispatch]);

  const onChangeCurrency = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ currency: value as Currency }));
  }, [dispatch]);

  const onChangeCountry = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ country: value as Country }));
  }, [dispatch]);

  const validateErrors = useMemo(() => {
    if (profileValidateErrors?.length) {
      return profileValidateErrors.map((error) => (
        <Text
          key={error}
          theme={TextTheme.ERROR}
          text={validateErrorTranslations[error]}
        />
      ));
    }
    return null;
  }, [profileValidateErrors, validateErrorTranslations]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ProfilePageHeader />
      {validateErrors}
      <ProfileCard
        data={profileForm}
        isLoading={profileIsLoading}
        error={profileError}
        readonly={profileReadonly}
        onChangeFirstname={onChangeFirstname}
        onChangeLastname={onChangeLastname}
        onChangeAge={onChangeAge}
        onChangeCity={onChangeCity}
        onChangeAvatar={onChangeAvatar}
        onChangeUsername={onChangeUsername}
        onChangeCurrency={onChangeCurrency}
        onChangeCountry={onChangeCountry}
      />
    </DynamicModuleLoader>
  );
});

export default ProfilePage;
