import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { VStack } from '@/shared/ui/Stack';
import { getRouteProfile } from '@/shared/const/router';

import { Comment as CommentType } from '../../model/types/comment';
import cls from './Comment.module.scss';

interface CommentProps {
    className?: string;
    comment?: CommentType;
    isLoading?: boolean;
}

export const Comment = memo((props: CommentProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <VStack max gap="8" className={classNames(cls.comment, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton width="100%" height={50} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <VStack max gap="8" className={classNames(cls.comment, {}, [className])}>
      <AppLink to={getRouteProfile(comment.user.id.toString())} className={cls.header}>
        {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
        <Text className={cls.username} title={comment.user.username} />
      </AppLink>
      <Text text={comment.text} />
    </VStack>
  );
});
