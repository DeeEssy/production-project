import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { DynamicModuleLoader, ReducerList } from 'shared/lib';
import { Loader } from 'shared/ui/Loader/Loader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import cls from './ArticlesPage.module.scss';
import { articlesActions, articlesReducer } from '../../model/slices/articles';
import { fetchArticles } from '../../model/services/fetchArticles';
import { getNormalizeArticles } from '../../model/selectors/getNormalizeArticles/getNormalizeArticles';
import { getArticlesIsLoading } from '../../model/selectors/getArticlesIsLoading/getArticlesIsLoading';
import { getArticlesView } from '../../model/selectors/getArticlesView/getArticlesView';

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

  useInitialEffect(() => {
    dispatch(articlesActions.initState());
    dispatch(fetchArticles());
  });

  return (
    <Suspense fallback={<Loader />}>
      <DynamicModuleLoader reducers={initialReducers}>
        <div className={classNames(cls.articlesPage, {}, [className])}>
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
          <ArticleList
            view={view}
            articles={articles}
            isLoading={isLoading}
          />
        </div>
      </DynamicModuleLoader>
    </Suspense>

  );
};

export default memo(ArticlesPage);
