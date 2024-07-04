import { EntityState } from '@reduxjs/toolkit';

import { User } from 'entities/User';
import { SortOrder } from 'shared/types';

import { ArticleBlock } from './articleBlocks';
import { ArticleSortField, ArticleType, ArticleView } from '../enums/article';

export interface Article {
    id: number;
    title: string;
    subtitle: string;
    user: User;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}

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
