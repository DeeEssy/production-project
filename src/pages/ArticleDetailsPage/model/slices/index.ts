import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types';
import {
  articleRecommendationsReducer,
} from './articleRecommendationsSlice';
import { articleCommentsReducer } from './articleCommentsSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  recommendations: articleRecommendationsReducer,
  comments: articleCommentsReducer,
});
