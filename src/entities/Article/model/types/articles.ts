import { EntityState } from '@reduxjs/toolkit';

import { SortOrder } from 'shared/types';
import {
  Article, ArticleSortField, ArticleType, ArticleView,
} from './article';

export interface ArticlesSchema extends EntityState<Article> {
    error?: string;
    isLoading?: boolean;

    // pagination
    page: number;
    limit?: number;
    hasMore: boolean;

    // filters
    view: ArticleView;
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: ArticleType;

    _inited: boolean;
}
