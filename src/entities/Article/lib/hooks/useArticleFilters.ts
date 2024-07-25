import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import { SortOrder } from '@/shared/types/sort';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

import { getArticlesView } from '../../model/selectors/getArticlesView/getArticlesView';
import { getArticlesSort } from '../../model/selectors/getArticlesSort/getArticlesSort';
import { getArticlesOrder } from '../../model/selectors/getArticlesOrder/getArticlesOrder';
import { getArticlesSearch } from '../../model/selectors/getArticlesSearch/getArticlesSearch';
import { getArticlesType } from '../../model/selectors/getArticlesType/getArticlesType';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import { articlesActions } from '../../model/slices/articles';
import { ArticleSortField, ArticleType, ArticleView } from '../../model/types/enums/article';

export function useArticleFilters() {
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesView);
  const sort = useSelector(getArticlesSort);
  const order = useSelector(getArticlesOrder);
  const search = useSelector(getArticlesSearch);
  const type = useSelector(getArticlesType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticles({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesActions.setView(view));
    },
    [dispatch],
  );

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesActions.setSort(newSort));
      dispatch(articlesActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesActions.setOrder(newOrder));
      dispatch(articlesActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesActions.setSearch(search));
      dispatch(articlesActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesActions.setType(value));
      dispatch(articlesActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const clearSearchValue = useCallback(() => {
    dispatch(articlesActions.setSearch(''));
    dispatch(articlesActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  return {
    view,
    sort,
    order,
    search,
    type,
    onChangeView,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeType,
    clearSearchValue,
  };
}
