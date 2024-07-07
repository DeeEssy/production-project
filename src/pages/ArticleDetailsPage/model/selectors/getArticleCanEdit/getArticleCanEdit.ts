import { createSelector } from '@reduxjs/toolkit';
import { getCurrentArticleData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

export const getArticleCanEdit = createSelector(
  getCurrentArticleData,
  getUserAuthData,
  (article, user) => {
    if (!article || !user) {
      return false;
    }

    return article.user.id === user.id;
  },
);
