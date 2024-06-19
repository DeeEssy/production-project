import { StateSchema } from 'app/providers/StoreProvider';
import { getCurrentArticleIsLoading } from './getCurrentArticleIsLoading';

describe('getCurrentArticleIsLoading', () => {
  test('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      currentArticle: {
        isLoading: true,
      },
    };
    expect(getCurrentArticleIsLoading(state as StateSchema)).toEqual(true);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getCurrentArticleIsLoading(state as StateSchema)).toEqual(undefined);
  });
});
