import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { fetchProfileData } from './fetchProfileData';

describe('fetchProfileData', () => {
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
  const profileId = 1;

  test('success fetching profile data', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    thunk.api.get.mockReturnValue(Promise.resolve({ data: form }));
    const result = await thunk.callThunk(profileId);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(form);
  });

  test('error fetching profile data', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk(profileId);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
