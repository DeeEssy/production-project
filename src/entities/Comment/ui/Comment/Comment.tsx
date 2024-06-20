import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './Comment.module.scss';
import { Comment as CommentType } from '../../model/types/comment';

interface CommentProps {
    className?: string;
    comment: CommentType;
    isLoading?: boolean;
}

export const Comment = memo((props: CommentProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <div className={classNames(cls.comment, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton className={cls.text} width="100%" height={50} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.comment, {}, [className])}>
      <div className={cls.header}>
        {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
        <Text className={cls.username} title={comment.user.username} />
      </div>
      <Text className={cls.text} text={comment.text} />
    </div>
  );
});
