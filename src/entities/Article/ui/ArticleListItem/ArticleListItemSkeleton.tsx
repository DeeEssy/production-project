import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';

import { ArticleView } from '../../model/types/enums/article';
import cls from './ArticleListItem.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';

interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = memo(({ className, view }: ArticleListItemSkeletonProps) => {
  if (view === ArticleView.BIG) {
    return (
      <Card
        padding="24"
        max
        className={classNames(cls.articleListItem, {}, [
          className,
          cls[view],
        ])}
      >
        <VStack max gap="16">
          <HStack gap="8" max>
            <Skeleton border="50%" height={32} width={32} />
            <Skeleton width={40} height={16} />
            <Skeleton width={80} height={16} />
          </HStack>
          <Skeleton height={24} className={cls.title} />
          <Skeleton height={18} className={cls.subtitle} />
          <Skeleton height={400} className={cls.img} />
          <Skeleton height={72} className={cls.textBlock} />
          <HStack max justify="between">
            <Skeleton height={42} width={126} />
            <Skeleton height={32} width={200} />
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <Skeleton width={200} height={200} className={cls.img} />
        </div>
        <div className={cls.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} className={cls.title} />
      </Card>
    </div>
  );
});
