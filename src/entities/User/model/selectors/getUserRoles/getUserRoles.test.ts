import { StateSchema } from 'app/providers/StoreProvider';

import { getUserRoles } from './getUserRoles';
import { UserRole } from '../../types/user';

describe('getUserRoles', () => {
  const userData = {
    id: 1,
    username: 'username',
    roles: [UserRole.ADMIN],
  };

  test('should return data', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: userData,
      },
    };
    expect(getUserRoles(state as StateSchema)).toBe(userData.roles);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getUserRoles(state as StateSchema)).toEqual(undefined);
  });
});
