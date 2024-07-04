import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import {
  ArticleSortField, ArticleView, ArticleViewSelector, ArticleSortSelector,
  ArticleTypeTabs,
  getArticlesView,
  getArticlesSort,
  getArticlesOrder,
  getArticlesSearch,
  getArticlesType,
  fetchArticles,
  articlesActions,
  ArticleType,
} from 'entities/Article';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { SortOrder } from 'shared/types';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { Button } from 'shared/ui/Button/Button';
import ClearIcon from 'shared/assets/icons/close.svg';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesView);
  const sort = useSelector(getArticlesSort);
  const order = useSelector(getArticlesOrder);
  const search = useSelector(getArticlesSearch);
  const type = useSelector(getArticlesType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticles({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 1000);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesActions.setView(view));
  }, [dispatch]);

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlesActions.setSort(newSort));
    dispatch(articlesActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlesActions.setOrder(newOrder));
    dispatch(articlesActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSearch = useCallback((search: string) => {
    dispatch(articlesActions.setSearch(search));
    dispatch(articlesActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  const onChangeType = useCallback((value: ArticleType) => {
    dispatch(articlesActions.setType(value));
    dispatch(articlesActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const clearSearchValue = useCallback(() => {
    dispatch(articlesActions.setSearch(''));
    dispatch(articlesActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  return (
    <div className={classNames(cls.articlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input
          onChange={onChangeSearch}
          value={search}
          placeholder={t('search')}
        />
        {search && (
        <Button className={cls.searchClear} onClick={clearSearchValue}>
          <ClearIcon />
        </Button>
        )}
      </Card>
      <ArticleTypeTabs
        value={type}
        onChangeType={onChangeType}
        className={cls.tabs}
      />
    </div>
  );
});
