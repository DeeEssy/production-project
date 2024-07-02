import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleType } from '../../types/article';

export const getArticlesType = (state: StateSchema) => state.articles?.type || ArticleType.ALL;
