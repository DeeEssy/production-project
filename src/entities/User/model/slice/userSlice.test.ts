import { UserRole, UserSchema } from '../types/user';
import { userReducer, userActions } from './userSlice';

describe('userSlice', () => {
  const userData = {
    id: 1,
    username: 'username',
    role: UserRole.ADMIN,
  };

  test('setAuthData', () => {
    const state: DeepPartial<UserSchema> = {};
    expect(userReducer(
        state as UserSchema,
        userActions.setAuthData(userData),
    )).toEqual({ authData: userData });
  });

  test('initAuthData', () => {
    const state: DeepPartial<UserSchema> = {};
    expect(userReducer(
        state as UserSchema,
        userActions.initAuthData(),
    )).toEqual({ _inited: true });
  });

  test('clearAuthData', () => {
    const state: DeepPartial<UserSchema> = { authData: userData };
    expect(userReducer(
        state as UserSchema,
        userActions.clearAuthData(),
    )).toEqual({ authData: undefined });
  });
});
