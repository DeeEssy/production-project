import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleType } from 'entities/Article';

export const getArticlesType = (state: StateSchema) => state.articles?.type || ArticleType.ALL;
