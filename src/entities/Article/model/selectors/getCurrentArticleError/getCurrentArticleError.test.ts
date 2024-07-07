import { StateSchema } from '@/app/providers/StoreProvider';
import { getCurrentArticleError } from './getCurrentArticleError';

describe('getCurrentArticleError', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      currentArticle: {
        error: 'error',
      },
    };
    expect(getCurrentArticleError(state as StateSchema)).toEqual('error');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getCurrentArticleError(state as StateSchema)).toEqual(undefined);
  });
});
