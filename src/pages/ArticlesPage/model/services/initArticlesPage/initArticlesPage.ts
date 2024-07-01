import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { articlesActions, fetchArticles, getArticlesInited } from 'widgets/InfiniteArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
    >(
      'articlesPage/initArticlesPage',
      async (queryParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const inited = getArticlesInited(getState());

        if (!inited) {
          const orderFromUrl = queryParams.get('order') as SortOrder;
          const sortFromUrl = queryParams.get('sort') as ArticleSortField;
          const searchFromUrl = queryParams.get('search');
          const typeFromUrl = queryParams.get('type') as ArticleType;

          if (orderFromUrl) {
            dispatch(articlesActions.setOrder(orderFromUrl));
          }

          if (sortFromUrl) {
            dispatch(articlesActions.setSort(sortFromUrl));
          }

          if (searchFromUrl) {
            dispatch(articlesActions.setSearch(searchFromUrl));
          }

          if (typeFromUrl) {
            dispatch(articlesActions.setType(typeFromUrl));
          }

          dispatch(articlesActions.initState());
          dispatch(fetchArticles({}));
        }
      },
    );
