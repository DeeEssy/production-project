import { combineReducers } from '@reduxjs/toolkit';
import { articleCommentsReducer } from '@/widgets/ArticleComments';
import { articleRecommendationsReducer } from '@/widgets/ArticleRecommendationsList';
import { ArticleDetailsPageSchema } from '../types';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  recommendations: articleRecommendationsReducer,
  comments: articleCommentsReducer,
});
