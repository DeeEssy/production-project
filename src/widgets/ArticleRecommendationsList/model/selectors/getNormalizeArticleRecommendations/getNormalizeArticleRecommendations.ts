import { StateSchema } from '@/app/providers/StoreProvider';
import { recommendationsAdapter } from '../../slices/articleRecommendationsSlice';

export const getNormalizeArticleRecommendations = recommendationsAdapter
  .getSelectors<StateSchema>((state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState());
