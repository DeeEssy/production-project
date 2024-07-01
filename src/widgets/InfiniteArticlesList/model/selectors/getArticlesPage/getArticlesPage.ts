import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesPage = (state: StateSchema) => state?.articles?.page || 1;
