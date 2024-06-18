import { StateSchema } from 'app/providers/StoreProvider';

export const getCurrentArticleError = (state: StateSchema) => state.currentArticle?.error;
