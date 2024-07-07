import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileError } from './getProfileError';
import { ValidateProfileError } from '../../types/enums/validateProfileErrors';

describe('getProfileError', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: ValidateProfileError.NO_DATA,
      },
    };
    expect(getProfileError(state as StateSchema)).toEqual(ValidateProfileError.NO_DATA);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileError(state as StateSchema)).toEqual(undefined);
  });
});
