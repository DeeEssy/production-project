import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArticleDetailsSchema } from '../types/interfaces/articleDetailsSchema';
import { fetchCurrentArticle } from '../services/fetchCurrentArticle/fetchCurrentArticle';
import { Article } from '../types/interfaces/articles';

const initialState: ArticleDetailsSchema = {
  isLoading: false,
};

const currentArticleSlice = createSlice({
  name: 'currentArticle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentArticle.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchCurrentArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCurrentArticle.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: currentArticleActions } = currentArticleSlice;

export const { reducer: currentArticleReducer } = currentArticleSlice;
