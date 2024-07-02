import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleSortField } from '../../types/article';

export const getArticlesSort = (state: StateSchema) => state.articles?.sort ?? ArticleSortField.CREATED;
