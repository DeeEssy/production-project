import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducerList } from 'shared/lib';
import { Loader } from 'shared/ui/Loader/Loader';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { ArticleRecommendationsList } from 'widgets/ArticleRecommendationsList';
import { ArticleComments } from 'widgets/ArticleComments';
import { articleDetailsPageReducer } from '../../model/slices';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

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
