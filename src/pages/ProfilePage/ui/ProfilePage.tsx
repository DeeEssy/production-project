import {
  ProfileCard, fetchProfileData, profileReducer, getProfileIsLoading, getProfileError,
  profileActions,
  getProfileReadonly,
  getProfileForm,
} from 'entities/Profile';

import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const initialReducers: ReducerList = {
  profile: profileReducer,
};

const ProfilePage = memo(() => {
  const dispatch = useAppDispatch();
  const profileForm = useSelector(getProfileForm);
  const profileIsLoading = useSelector(getProfileIsLoading);
  const profileError = useSelector(getProfileError);
  const profileReadonly = useSelector(getProfileReadonly);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

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

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ProfilePageHeader />
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
