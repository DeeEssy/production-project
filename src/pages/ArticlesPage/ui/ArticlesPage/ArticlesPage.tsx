import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, memo, useCallback } from 'react';
import { DynamicModuleLoader, ReducerList } from 'shared/lib';
import { Loader } from 'shared/ui/Loader/Loader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page';
import { useSearchParams } from 'react-router-dom';
import { InfiniteArticlesList } from 'widgets/InfiniteArticlesList';
import { articlesReducer, fetchNextArticlesPage, getArticlesIsLoading } from 'entities/Article';
import { ArticlesPageFilters } from 'widgets/ArticlesPageFilters';
import cls from './ArticlesPage.module.scss';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

interface ArticlesPageProps {
    className?: string;
}

const initialReducers: ReducerList = {
  articles: articlesReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticlesIsLoading);
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoading]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  return (
    <Suspense fallback={<Loader />}>
      <DynamicModuleLoader reducers={initialReducers} removeAfterUnMount={false}>
        <Page onScrollEnd={onLoadNextPart} className={classNames(cls.articlesPage, {}, [className])}>
          <ArticlesPageFilters />
          <InfiniteArticlesList />
        </Page>
      </DynamicModuleLoader>
    </Suspense>

  );
};

export default memo(ArticlesPage);
