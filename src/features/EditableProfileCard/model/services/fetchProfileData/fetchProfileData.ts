import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';

export const fetchProfileData = createAsyncThunk<Profile, number, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (userId, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.get<Profile>(`/profile/${userId}`);

      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
