import { Suspense, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';
import { InfiniteArticlesList } from '@/widgets/InfiniteArticlesList';
import { articlesReducer, fetchNextArticlesPage, getArticlesIsLoading } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib';
import { Loader } from '@/shared/ui/Loader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import cls from './ArticlesPage.module.scss';

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
        <StickyContentLayout
          left={<ViewSelectorContainer />}
          right={<FiltersContainer />}
          content={(
            <Page
              data-testid="articlesPage"
              onScrollEnd={onLoadNextPart}
              className={classNames(
                cls.articlesPage,
                {},
                [className],
              )}
            >
              <InfiniteArticlesList className={cls.list} />
            </Page>
          )}
        />
      </DynamicModuleLoader>
    </Suspense>

  );
};

export default memo(ArticlesPage);
