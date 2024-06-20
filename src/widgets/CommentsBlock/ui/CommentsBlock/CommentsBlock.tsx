import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CommentList, CommentType } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import cls from './CommentsBlock.module.scss';

interface CommentsBlockProps {
    className?: string;
    comments?: CommentType[];
    error?: string;
    isLoading?: boolean;
}

export const CommentsBlock = memo(({
  className, comments, error, isLoading,
}: CommentsBlockProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.commentsBlock, {}, [className])}>
      <Text title={t('comments')} />
      <CommentList error={error} isLoading={isLoading} comments={comments} />
    </div>
  );
});
