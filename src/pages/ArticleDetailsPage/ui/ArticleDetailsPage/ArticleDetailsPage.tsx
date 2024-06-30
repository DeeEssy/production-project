import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { CommentsBlock } from 'widgets/CommentsBlock';
import { DynamicModuleLoader, ReducerList } from 'shared/lib';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Loader } from 'shared/ui/Loader/Loader';
import { Page } from 'widgets/Page/Page';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack';
import { articleDetailsPageReducer } from '../../model/slices';
import { getNormalizeArticleRecommendations } from '../../model/selectors/getNormalizeArticleRecommendations/getNormalizeArticleRecommendations';
import { getArticleCommentsIsLoading }
  from '../../model/selectors/getArticleCommentsIsLoading/getArticleCommentsIsLoading';
import { getArticleCommentsError } from '../../model/selectors/getArticleCommentsError/getArticleCommentsError';
import cls from './ArticleDetailsPage.module.scss';
import { fetchArticleComments } from '../../model/services/fetchArticleComments';
import { getNormalizeArticleComments }
  from '../../model/selectors/getNormalizeArticleComments/getNormalizeArticleComments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/getArticleRecommendationsIsLoading/getArticleRecommendationsIsLoading';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
    className?: string;
}

const initialReducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{id: string}>();
  const dispatch = useAppDispatch();
  const comments = useSelector(getNormalizeArticleComments.selectAll);
  const isCommentsLoading = useSelector(getArticleCommentsIsLoading);
  const commentsError = useSelector(getArticleCommentsError);

  const recommendations = useSelector(getNormalizeArticleRecommendations.selectAll);
  const isRecommendationsLoading = useSelector(getArticleRecommendationsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchArticleComments(Number(id)));
    dispatch(fetchArticleRecommendations());
  });

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Suspense fallback={<Loader />}>
        <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
          <VStack max gap="16">
            <ArticleDetailsPageHeader />
            <ArticleDetails id={Number(id)} />
            <Text size={TextSize.L} title={t('recommendations')} />
            <ArticleList target="_blank" className={cls.recommendations} articles={recommendations} isLoading={isRecommendationsLoading} />
            <CommentsBlock
              onSendComment={onSendComment}
              error={commentsError}
              isLoading={isCommentsLoading}
              comments={comments}
            />
          </VStack>
        </Page>
      </Suspense>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
