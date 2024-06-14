import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'login/loginByUsername',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.post<User>('/login', {
        username, password,
      });

      if (!response.data) {
        throw new Error();
      }

      // just an imitation
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));

      thunkAPI.dispatch(userActions.setAuthData(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
