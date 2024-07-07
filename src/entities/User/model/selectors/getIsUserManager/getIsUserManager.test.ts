import { StateSchema } from '@/app/providers/StoreProvider';

import { getIsUserManager } from './getIsUserManager';
import { UserRole } from '../../types/enums/user';

describe('getIsUserManager', () => {
  const userData = {
    id: 1,
    username: 'username',
    roles: [UserRole.MANAGER],
  };

  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: userData,
      },
    };
    expect(getIsUserManager(state as StateSchema)).toBe(true);
  });

  test('should return false', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: { ...userData, roles: [UserRole.USER] },
      },
    };
    expect(getIsUserManager(state as StateSchema)).toBe(false);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getIsUserManager(state as StateSchema)).toEqual(undefined);
  });
});
