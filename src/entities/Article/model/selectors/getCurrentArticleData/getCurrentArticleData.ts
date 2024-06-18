import { StateSchema } from 'app/providers/StoreProvider';

export const getCurrentArticleData = (state: StateSchema) => state.currentArticle?.data;
