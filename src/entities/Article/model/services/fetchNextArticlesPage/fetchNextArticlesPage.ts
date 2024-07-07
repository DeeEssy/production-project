import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchArticles } from '../fetchArticles/fetchArticles';
import { articlesActions } from '../../slices/articles';
import { getArticlesHasMore } from '../../selectors/getArticlesHasMore/getArticlesHasMore';
import { getArticlesPage } from '../../selectors/getArticlesPage/getArticlesPage';
import { getArticlesIsLoading } from '../../selectors/getArticlesIsLoading/getArticlesIsLoading';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articles/fetchNextArticlesPage',
  async (_, thunkAPI) => {
    const hasMore = getArticlesHasMore(thunkAPI.getState());
    const page = getArticlesPage(thunkAPI.getState());
    const isLoading = getArticlesIsLoading(thunkAPI.getState());

    if (hasMore && !isLoading) {
      thunkAPI.dispatch(articlesActions.setPage(page + 1));
      thunkAPI.dispatch(fetchArticles({}));
    }
  },
);
