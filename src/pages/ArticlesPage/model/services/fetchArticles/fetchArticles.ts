import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlesLimit } from '../../selectors/getArticlesLimit/getArticlesLimit';

interface FetchArticlesListProps {
  page?: number;
}

export const fetchArticles = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
  'articles/fetchArticles',
  async (props, thunkAPI) => {
    const { page = 1 } = props;
    const limit = getArticlesLimit(thunkAPI.getState());

    try {
      const response = await thunkAPI.extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
        },
      });

      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
