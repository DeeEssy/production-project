import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesLimit = (state: StateSchema) => state?.articles?.limit;
