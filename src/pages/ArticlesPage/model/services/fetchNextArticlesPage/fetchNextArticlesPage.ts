import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesHasMore } from '../../selectors/getArticlesHasMore/getArticlesHasMore';
import { getArticlesPage } from '../../selectors/getArticlesPage/getArticlesPage';
import { getArticlesIsLoading } from '../../selectors/getArticlesIsLoading/getArticlesIsLoading';
import { fetchArticles } from '../fetchArticles/fetchArticles';
import { articlesActions } from '../../slices/articles';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articles/fetchNextArticlesPage',
  async (_, thunkAPI) => {
    const hasMore = getArticlesHasMore(thunkAPI.getState());
    const page = getArticlesPage(thunkAPI.getState());
    const isLoading = getArticlesIsLoading(thunkAPI.getState());

    if (hasMore && !isLoading) {
      thunkAPI.dispatch(articlesActions.setPage(page + 1));
      thunkAPI.dispatch(fetchArticles({ page: page + 1 }));
    }
  },
);
