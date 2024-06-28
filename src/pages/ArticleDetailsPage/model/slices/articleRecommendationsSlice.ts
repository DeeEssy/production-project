import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations';
import { ArticleRecommendationsSchema } from '../types/articleRecommendationsSchema';

export const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

const articleRecommendationsSlice = createSlice({
  name: 'articleRecommendationsSlice',
  initialState: recommendationsAdapter.getInitialState<ArticleRecommendationsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (
        state,
        action,
      ) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  reducer: articleRecommendationsReducer,
} = articleRecommendationsSlice;
