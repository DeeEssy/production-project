import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { updateProfileData } from './updateProfileData';
import { ValidateProfileError } from '../../types/profile';

const form = {
  username: 'admin',
  age: 22,
  country: Country.Ukraine,
  lastname: 'test',
  firstname: 'test',
  city: 'test',
  currency: Currency.USD,
  avatar: 'test.png',
};

describe('updateProfileData', () => {
  test('success fetching profile data', async () => {
    const form = {
      username: 'admin',
      age: 22,
      country: Country.Ukraine,
      lastname: 'test',
      firstname: 'test',
      city: 'test',
      currency: Currency.USD,
      avatar: 'test.png',
    };

    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form,
      },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ data: form }));
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(form);
  });

  test('error fetching profile data', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form,
      },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
  });

  test('error validate profile data', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...form, username: '' },
      },
    });

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USERNAME]);
  });
});
