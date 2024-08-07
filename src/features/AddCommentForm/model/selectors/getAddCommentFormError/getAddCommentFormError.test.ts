import { StateSchema } from '@/app/providers/StoreProvider';
import { getAddCommentFormError } from './getAddCommentFormError';

describe('getAddCommentFormError', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: {
        error: 'error text',
      },
    };
    expect(getAddCommentFormError(state as StateSchema)).toEqual('error text');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getAddCommentFormError(state as StateSchema)).toEqual(undefined);
  });
});
