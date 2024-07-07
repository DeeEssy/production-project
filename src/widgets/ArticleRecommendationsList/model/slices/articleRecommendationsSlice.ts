import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';
import { ArticleRecommendationsSchema } from '../types/articleRecommendationsSchema';

export const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

const articleRecommendationsSlice = createSlice({
  name: 'articleRecommendations',
  initialState: recommendationsAdapter.getInitialState<ArticleRecommendationsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: () => {},
});

export const {
  reducer: articleRecommendationsReducer,
} = articleRecommendationsSlice;
