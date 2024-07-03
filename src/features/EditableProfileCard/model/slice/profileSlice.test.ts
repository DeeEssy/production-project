import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { profileReducer, profileActions } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema, ValidateProfileError } from '../types/editableProfileCard';

const form = {
  username: 'admin',
  age: 22,
  country: Country.Ukraine,
  lastname: 'test',
  firstname: 'test',
  city: 'test',
  currency: Currency.USD,
};

describe('profileSlice', () => {
  test('setReadonly', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: true,
    };
    expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(false))).toEqual({ readonly: false });
  });

  test('updateProfile', () => {
    const state: DeepPartial<ProfileSchema> = {
      form,
    };
    expect(profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ firstname: 'test2' }),
    )).toEqual({ form: { ...form, firstname: 'test2' } });
  });

  test('cancelEdit', () => {
    const state: DeepPartial<ProfileSchema> = {
      form,
      data: form,
      readonly: false,
    };
    expect(profileReducer(
        state as ProfileSchema,
        profileActions.cancelEdit(),
    )).toEqual({
      ...state,
      readonly: true,
    });
  });

  test('updateProfileData.pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    };
    expect(profileReducer(
        state as ProfileSchema,
        updateProfileData.pending,
    )).toEqual({
      isLoading: true,
      validateErrors: undefined,
    });
  });

  test('updateProfileData.fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      readonly: false,
    };
    expect(profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(form, '', 1, ''),
    )).toEqual({
      isLoading: false,
      readonly: true,
      data: form,
      form,
    });
  });
});
