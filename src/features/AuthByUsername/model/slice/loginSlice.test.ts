import { DeepPartial } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/login';
import { loginReducer, loginActions } from './loginSlice';

describe('loginSlice', () => {
  test('setUsername', () => {
    const state: DeepPartial<LoginSchema> = {
      username: '',
    };
    expect(loginReducer(state as LoginSchema, loginActions.setUsername('admin'))).toEqual({ username: 'admin' });
  });

  test('setPassword', () => {
    const state: DeepPartial<LoginSchema> = {
      password: '',
    };
    expect(loginReducer(state as LoginSchema, loginActions.setPassword('123123'))).toEqual({ password: '123123' });
  });
});
