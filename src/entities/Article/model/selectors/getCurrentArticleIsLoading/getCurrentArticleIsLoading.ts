import { StateSchema } from 'app/providers/StoreProvider';

export const getCurrentArticleIsLoading = (state: StateSchema) => state.currentArticle?.isLoading;
