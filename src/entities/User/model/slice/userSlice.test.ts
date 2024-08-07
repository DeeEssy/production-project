import { UserSchema } from '../types/interfaces/user';
import { UserRole } from '../types/enums/user';
import { userReducer, userActions } from './userSlice';

describe('userSlice', () => {
  const userData = {
    id: 1,
    username: 'username',
    roles: [UserRole.ADMIN],
  };

  test('setAuthData', () => {
    const state: DeepPartial<UserSchema> = {};
    expect(userReducer(
        state as UserSchema,
        userActions.setAuthData(userData),
    )).toEqual({ authData: userData });
  });

  test('clearAuthData', () => {
    const state: DeepPartial<UserSchema> = { authData: userData };
    expect(userReducer(
        state as UserSchema,
        userActions.clearAuthData(),
    )).toEqual({ authData: undefined });
  });
});
