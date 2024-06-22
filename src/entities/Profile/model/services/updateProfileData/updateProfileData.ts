import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile, ValidateProfileError } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<Profile, number, ThunkConfig<ValidateProfileError[]>>(
  'profile/updateProfileData',
  async (profileId, thunkAPI) => {
    const formData = getProfileForm(thunkAPI.getState());

    const errors = validateProfileData(formData);

    if (errors.length) {
      return thunkAPI.rejectWithValue(errors);
    }

    try {
      const response = await thunkAPI.extra.api.put<Profile>(`/profile/${profileId}`, formData);

      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
  },
);
