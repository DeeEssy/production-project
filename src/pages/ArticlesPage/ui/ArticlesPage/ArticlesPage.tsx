import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { DynamicModuleLoader, ReducerList } from 'shared/lib';
import { Loader } from 'shared/ui/Loader/Loader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page/Page';
import cls from './ArticlesPage.module.scss';
import { articlesActions, articlesReducer } from '../../model/slices/articles';
import { getNormalizeArticles } from '../../model/selectors/getNormalizeArticles/getNormalizeArticles';
import { getArticlesIsLoading } from '../../model/selectors/getArticlesIsLoading/getArticlesIsLoading';
import { getArticlesView } from '../../model/selectors/getArticlesView/getArticlesView';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

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

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesActions.setView(view));
  }, [dispatch]);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoading]);

  useInitialEffect(() => {
    dispatch(initArticlesPage());
  });

  return (
    <Suspense fallback={<Loader />}>
      <DynamicModuleLoader reducers={initialReducers} removeAfterUnMount={false}>
        <Page onScrollEnd={onLoadNextPart} className={classNames(cls.articlesPage, {}, [className])}>
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
          <ArticleList
            view={view}
            articles={articles}
            isLoading={isLoading}
          />
        </Page>
      </DynamicModuleLoader>
    </Suspense>

  );
};

export default memo(ArticlesPage);
