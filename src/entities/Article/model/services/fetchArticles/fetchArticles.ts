import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import { getArticlesLimit } from '../../selectors/getArticlesLimit/getArticlesLimit';
import { getArticlesPage } from '../../selectors/getArticlesPage/getArticlesPage';
import { getArticlesSearch } from '../../selectors/getArticlesSearch/getArticlesSearch';
import { getArticlesSort } from '../../selectors/getArticlesSort/getArticlesSort';
import { getArticlesOrder } from '../../selectors/getArticlesOrder/getArticlesOrder';
import { getArticlesType } from '../../selectors/getArticlesType/getArticlesType';
import { Article, ArticleType } from '../../types/article';

interface FetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticles = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
  'articles/fetchArticles',
  async (props, thunkAPI) => {
    const limit = getArticlesLimit(thunkAPI.getState());
    const page = getArticlesPage(thunkAPI.getState());
    const search = getArticlesSearch(thunkAPI.getState());
    const sort = getArticlesSort(thunkAPI.getState());
    const order = getArticlesOrder(thunkAPI.getState());
    const type = getArticlesType(thunkAPI.getState());

    try {
      addQueryParams({
        sort, order, search, type,
      });

      const response = await thunkAPI.extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
          type: type === ArticleType.ALL ? undefined : type,
        },
      });

      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
