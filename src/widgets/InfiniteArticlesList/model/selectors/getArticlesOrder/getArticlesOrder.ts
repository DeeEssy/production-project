import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesOrder = (state: StateSchema) => state.articles?.order ?? 'asc';
