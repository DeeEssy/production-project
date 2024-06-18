import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchCurrentArticle = createAsyncThunk<Article, number, ThunkConfig<string>>(
  'currentArticle/fetchCurrentArticle',
  async (id, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.get<Article>(`/articles/${id}`);

      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
