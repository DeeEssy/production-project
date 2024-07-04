import { createSelector } from '@reduxjs/toolkit';
import { getUserRoles } from '../getUserRoles/getUserRoles';
import { UserRole } from '../../types/enums/user';

export const getIsUserAdmin = createSelector(getUserRoles, (roles) => roles?.includes(UserRole.ADMIN));
