import { profileReducer } from 'entities/Profile';
import { memo } from 'react';
import { classNames } from 'shared/lib';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const initialReducers: ReducerList = {
  profile: profileReducer,
};

const ProfilePage = memo(() => (
  <DynamicModuleLoader reducers={initialReducers}>
    <div className={classNames('lds-ellipsis', {}, [])} />
  </DynamicModuleLoader>
));

export default ProfilePage;
