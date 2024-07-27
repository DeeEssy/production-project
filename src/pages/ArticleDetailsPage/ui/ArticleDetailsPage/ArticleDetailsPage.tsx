import { Suspense, memo } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';
import { ArticleRecommendationsList } from '@/widgets/ArticleRecommendationsList';
import { ArticleComments } from '@/widgets/ArticleComments';
import { ArticleRating } from '@/features/ArticleRating';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib';
import { Loader } from '@/shared/ui/Loader';
import { VStack } from '@/shared/ui/Stack';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

import { articleDetailsPageReducer } from '../../model/slices';
import cls from './ArticleDetailsPage.module.scss';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

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
        <StickyContentLayout
          content={(
            <Page
              className={classNames(
                cls.articleDetailsPage,
                {},
                [className],
              )}
            >
              <VStack gap="16" max>
                <DetailsContainer id={(Number(id))} />
                <ArticleRating id={Number(id)} />
                <ArticleRecommendationsList />
                <ArticleComments id={Number(id)} />
              </VStack>
            </Page>
          )}
          right={<AdditionalInfoContainer />}
        />
      </Suspense>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
