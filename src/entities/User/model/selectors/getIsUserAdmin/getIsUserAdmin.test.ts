import { StateSchema } from '@/app/providers/StoreProvider';

import { getIsUserAdmin } from './getIsUserAdmin';
import { UserRole } from '../../types/enums/user';

describe('getIsUserAdmin', () => {
  const userData = {
    id: 1,
    username: 'username',
    roles: [UserRole.ADMIN],
  };

  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: userData,
      },
    };
    expect(getIsUserAdmin(state as StateSchema)).toBe(true);
  });

  test('should return false', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: { ...userData, roles: [UserRole.USER] },
      },
    };
    expect(getIsUserAdmin(state as StateSchema)).toBe(false);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getIsUserAdmin(state as StateSchema)).toEqual(undefined);
  });
});
