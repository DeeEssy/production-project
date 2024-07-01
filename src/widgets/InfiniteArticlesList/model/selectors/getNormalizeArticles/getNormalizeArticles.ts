import { StateSchema } from 'app/providers/StoreProvider';
import { articlesAdapter } from '../../slices/articles';

export const getNormalizeArticles = articlesAdapter
  .getSelectors<StateSchema>((state) => state.articles || articlesAdapter.getInitialState());
