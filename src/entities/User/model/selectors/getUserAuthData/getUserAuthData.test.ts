import { StateSchema } from '@/app/providers/StoreProvider';

import { getUserAuthData } from './getUserAuthData';

describe('getUserAuthData', () => {
  const userData = {
    id: 1,
    username: 'username',
  };

  test('should return data', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: userData,
      },
    };
    expect(getUserAuthData(state as StateSchema)).toEqual(userData);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getUserAuthData(state as StateSchema)).toEqual(undefined);
  });
});
