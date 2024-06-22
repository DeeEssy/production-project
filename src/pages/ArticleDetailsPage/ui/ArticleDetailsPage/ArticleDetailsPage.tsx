import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, memo, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { CommentsBlock } from 'widgets/CommentsBlock';
import { DynamicModuleLoader, ReducerList } from 'shared/lib';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Loader } from 'shared/ui/Loader/Loader';
import { getArticleCommentsIsLoading }
  from '../../model/selectors/getArticleCommentsIsLoading/getArticleCommentsIsLoading';
import { getArticleCommentsError } from '../../model/selectors/getArticleCommentsError/getArticleCommentsError';
import cls from './ArticleDetailsPage.module.scss';
import { articleCommentsReducer } from '../../model/slices/articleComments';
import { fetchArticleComments } from '../../model/services/fetchArticleComments';
import { getNormalizeArticleComments }
  from '../../model/selectors/getNormalizeArticleComments/getNormalizeArticleComments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle';

interface ArticleDetailsPageProps {
    className?: string;
}

const initialReducers: ReducerList = {
  articleComments: articleCommentsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { id } = useParams<{id: string}>();
  const dispatch = useAppDispatch();
  const comments = useSelector(getNormalizeArticleComments.selectAll);
  const isCommentsLoading = useSelector(getArticleCommentsIsLoading);
  const commentsError = useSelector(getArticleCommentsError);

  useInitialEffect(() => {
    dispatch(fetchArticleComments(Number(id)));
  });

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        <ArticleDetails id={Number(id)} />
        <DynamicModuleLoader reducers={initialReducers}>
          <CommentsBlock
            onSendComment={onSendComment}
            error={commentsError}
            isLoading={isCommentsLoading}
            comments={comments}
          />
        </DynamicModuleLoader>
      </div>
    </Suspense>
  );
};

export default memo(ArticleDetailsPage);
