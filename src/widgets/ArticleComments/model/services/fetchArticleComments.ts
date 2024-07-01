import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { CommentType } from 'entities/Comment';

export const fetchArticleComments = createAsyncThunk<CommentType[], number, ThunkConfig<string>>(
  'articleComments/fetchArticleComments',
  async (articleId, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.get<CommentType[]>('/comments', {
        params: {
          articleId,
          _expand: 'user',
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
