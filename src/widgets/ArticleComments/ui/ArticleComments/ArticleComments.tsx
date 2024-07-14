import { memo, Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AddCommentForm } from '@/features/AddCommentForm';
import { CommentList } from '@/entities/Comment';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { Loader } from '@/shared/ui/Loader';
import { addCommentForArticle } from '../../model/services/addCommentForArticle';
import { getNormalizeArticleComments } from '../../model/selectors/getNormalizeArticleComments/getNormalizeArticleComments';
import { getArticleCommentsIsLoading } from '../../model/selectors/getArticleCommentsIsLoading/getArticleCommentsIsLoading';
import { getArticleCommentsError } from '../../model/selectors/getArticleCommentsError/getArticleCommentsError';
import { fetchArticleComments } from '../../model/services/fetchArticleComments';
import cls from './ArticleComments.module.scss';

interface ArticleCommentsProps {
    className?: string;
    id: number;
}

export const ArticleComments = memo(({
  className, id,
}: ArticleCommentsProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const comments = useSelector(getNormalizeArticleComments.selectAll);
  const isLoading = useSelector(getArticleCommentsIsLoading);
  const error = useSelector(getArticleCommentsError);

  useInitialEffect(() => {
    dispatch(fetchArticleComments(id));
  });

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  return (
    <VStack max gap="16" className={classNames(cls.articleComments, {}, [className])}>
      {!isLoading && (
      <>
        <Text size={TextSize.L} className={classNames(cls.title)} title={t('comments')} />
        <Suspense fallback={<Loader />}>
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>
      </>
      )}
      <CommentList error={error} isLoading={isLoading} comments={comments} />
    </VStack>
  );
});
