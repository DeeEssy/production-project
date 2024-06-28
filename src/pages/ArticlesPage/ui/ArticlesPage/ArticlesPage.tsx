import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, memo, useCallback } from 'react';
import { ArticleList } from 'entities/Article';
import { DynamicModuleLoader, ReducerList } from 'shared/lib';
import { Loader } from 'shared/ui/Loader/Loader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page/Page';
import { useSearchParams } from 'react-router-dom';
import cls from './ArticlesPage.module.scss';
import { articlesReducer } from '../../model/slices/articles';
import { getNormalizeArticles } from '../../model/selectors/getNormalizeArticles/getNormalizeArticles';
import { getArticlesIsLoading } from '../../model/selectors/getArticlesIsLoading/getArticlesIsLoading';
import { getArticlesView } from '../../model/selectors/getArticlesView/getArticlesView';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilter';

interface ArticlesPageProps {
    className?: string;
}

const initialReducers: ReducerList = {
  articles: articlesReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getNormalizeArticles.selectAll);
  const isLoading = useSelector(getArticlesIsLoading);
  const view = useSelector(getArticlesView);
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
          <ArticleList
            view={view}
            articles={articles}
            isLoading={isLoading}
            className={cls.list}
          />
        </Page>
      </DynamicModuleLoader>
    </Suspense>

  );
};

export default memo(ArticlesPage);
