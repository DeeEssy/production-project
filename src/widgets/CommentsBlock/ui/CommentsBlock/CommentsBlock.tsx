import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CommentList, CommentType } from 'entities/Comment';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { AddCommentForm } from 'features/AddCommentForm';
import cls from './CommentsBlock.module.scss';

interface CommentsBlockProps {
    className?: string;
    comments?: CommentType[];
    error?: string;
    isLoading?: boolean;
    onSendComment: (text :string) => void;
}

export const CommentsBlock = memo(({
  className, comments, error, isLoading, onSendComment,
}: CommentsBlockProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.commentsBlock, {}, [className])}>
      {!isLoading && (
      <>
        <Text size={TextSize.L} className={classNames(cls.title)} title={t('comments')} />
        <AddCommentForm onSendComment={onSendComment} />
      </>
      )}
      <CommentList error={error} isLoading={isLoading} comments={comments} />
    </div>
  );
});
