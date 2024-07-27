import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';

import { Comment } from '../Comment/Comment';
import { Comment as CommentType } from '../../model/types/comment';

interface CommentListProps {
    className?: string;
    comments?: CommentType[];
    isLoading?: boolean;
    error?: string;
}

export const CommentList = memo((props: CommentListProps) => {
  const {
    className, isLoading, comments, error,
  } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack gap="16" max className={classNames('', {}, [className])}>
        <Comment isLoading />
        <Comment isLoading />
        <Comment isLoading />
      </VStack>
    );
  }

  return (
    <VStack max gap="16" className={classNames('', {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <Comment
            key={comment.id}
            isLoading={isLoading}
            comment={comment}
          />
        ))
        : <HStack align="center" justify="center" max><Text text={t('no_comments')} /></HStack>}
    </VStack>
  );
});
