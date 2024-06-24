import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';

export interface ArticlesSchema extends EntityState<Article> {
    error?: string;
    isLoading?: boolean;
    view: ArticleView;
}
