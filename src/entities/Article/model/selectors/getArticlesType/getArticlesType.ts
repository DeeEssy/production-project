import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleType } from '../../types/enums/article';

export const getArticlesType = (state: StateSchema) => state.articles?.type || ArticleType.ALL;
