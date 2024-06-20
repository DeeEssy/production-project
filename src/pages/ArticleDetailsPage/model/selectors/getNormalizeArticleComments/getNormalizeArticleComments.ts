import { StateSchema } from 'app/providers/StoreProvider';
import { commentsAdapter } from '../../slices/articleComments';

export const getNormalizeArticleComments = commentsAdapter
  .getSelectors<StateSchema>((state) => state.articleComments || commentsAdapter.getInitialState());
