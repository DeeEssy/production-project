import { Suspense, memo } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';
import { ArticleRecommendationsList } from '@/widgets/ArticleRecommendationsList';
import { ArticleComments } from '@/widgets/ArticleComments';
import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib';
import { Loader } from '@/shared/ui/Loader/Loader';
import { VStack } from '@/shared/ui/Stack';

import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const initialReducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { id } = useParams<{id: string}>();

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Suspense fallback={<Loader />}>
        <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
          <VStack max gap="16">
            <ArticleDetailsPageHeader />
            <ArticleDetails id={Number(id)} />
            <ArticleRecommendationsList />
            <ArticleComments id={Number(id)} />
          </VStack>
        </Page>
      </Suspense>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
