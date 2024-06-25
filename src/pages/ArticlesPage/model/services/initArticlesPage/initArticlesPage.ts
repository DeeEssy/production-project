import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesInited } from '../../selectors/getArticlesInited/getArticlesInited';
import { articlesActions } from '../../slices/articles';
import { fetchArticles } from '../fetchArticles/fetchArticles';

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
    >(
      'articlesPage/initArticlesPage',
      async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const inited = getArticlesInited(getState());

        if (!inited) {
          dispatch(articlesActions.initState());
          dispatch(fetchArticles({
            page: 1,
          }));
        }
      },
    );
