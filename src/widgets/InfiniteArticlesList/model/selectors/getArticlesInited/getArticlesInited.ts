import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesInited = (state: StateSchema) => state?.articles?._inited;
