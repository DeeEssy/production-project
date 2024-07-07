import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { CommentType } from '@/entities/Comment';
import { getCurrentArticleData } from '@/entities/Article';
import {
  fetchArticleComments,
} from './fetchArticleComments';

export const addCommentForArticle = createAsyncThunk<
    CommentType,
    string,
    ThunkConfig<string>
    >(
      'articleDetails/addCommentForArticle',
      async (text, thunkApi) => {
        const {
          extra, dispatch, rejectWithValue, getState,
        } = thunkApi;

        const userData = getUserAuthData(getState());
        const article = getCurrentArticleData(getState());

        if (!userData || !text || !article) {
          return rejectWithValue('no data');
        }

        try {
          const response = await extra.api.post<CommentType>('/comments', {
            articleId: article.id,
            userId: userData.id,
            text,
          });

          if (!response.data) {
            throw new Error();
          }

          dispatch(fetchArticleComments(article.id));

          return response.data;
        } catch (e) {
          return rejectWithValue('error');
        }
      },
    );
