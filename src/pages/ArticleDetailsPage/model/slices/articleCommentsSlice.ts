import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { CommentType } from 'entities/Comment';
import { ArticleDetailsCommentsSchema } from '../types/articleDetailsCommentsSchema';
import { fetchArticleComments } from '../services/fetchArticleComments';

export const commentsAdapter = createEntityAdapter<CommentType>({
  selectId: (comment) => comment.id,
});

const articleCommentsSlice = createSlice({
  name: 'articleComments',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleComments.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleComments.fulfilled, (state, action: PayloadAction<CommentType[]>) => {
        state.isLoading = false;
        commentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleComments.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: articleCommentsActions } = articleCommentsSlice;

export const { reducer: articleCommentsReducer } = articleCommentsSlice;
