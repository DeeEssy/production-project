import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import { ArticlesSchema } from '../types/articles';
import { fetchArticles } from '../services/fetchArticles';

export const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: articlesAdapter.getInitialState<ArticlesSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem('articlesView', action.payload);
    },
    initState: (state) => {
      state.view = localStorage.getItem('articlesView') as ArticleView;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        articlesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: articlesActions } = articlesSlice;

export const { reducer: articlesReducer } = articlesSlice;
