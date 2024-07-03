import { StateSchema } from 'app/providers/StoreProvider';

import { getUserAuthInited } from './getUserAuthInited';

describe('getUserAuthInited', () => {
  test('should return _inited', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        _inited: true,
      },
    };
    expect(getUserAuthInited(state as StateSchema)).toEqual(true);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getUserAuthInited(state as StateSchema)).toEqual(undefined);
  });
});
