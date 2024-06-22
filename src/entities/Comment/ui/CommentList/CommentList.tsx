import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './CommentList.module.scss';
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
      <div className={classNames(cls.commentList, {}, [className])}>
        <Comment isLoading />
        <Comment isLoading />
        <Comment isLoading />
      </div>
    );
  }

  return (
    <div className={classNames(cls.commentList, {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <Comment
            key={comment.id}
            isLoading={isLoading}
            className={cls.comment}
            comment={comment}
          />
        ))
        : <Text className={cls.noComments} text={t('no_comments')} />}
    </div>
  );
});
