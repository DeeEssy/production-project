import { createSelector } from '@reduxjs/toolkit';
import { getUserRoles } from '../getUserRoles/getUserRoles';
import { UserRole } from '../../types/enums/user';

export const getIsUserManager = createSelector(getUserRoles, (roles) => roles?.includes(UserRole.MANAGER));
