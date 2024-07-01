import { StateSchema } from 'app/providers/StoreProvider';
import { commentsAdapter } from '../../slices/articleCommentsSlice';

export const getNormalizeArticleComments = commentsAdapter
  .getSelectors<StateSchema>((state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState());
