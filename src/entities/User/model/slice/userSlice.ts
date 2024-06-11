import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);

      if (user) {
        state.authData = JSON.parse(user);
      }
    },
    clearAuthData: (state) => {
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
      state.authData = null;
    },
  },
});

export const { actions: userActions } = userSlice;

export const { reducer: userReducer } = userSlice;
