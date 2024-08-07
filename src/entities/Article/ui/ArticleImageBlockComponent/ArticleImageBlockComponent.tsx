import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';

import { ArticleImageBlock } from '../../model/types/interfaces/articleBlocks';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(({ className, block }: ArticleImageBlockComponentProps) => (
  <div className={classNames(cls.articleImageBlockComponent, {}, [className])}>
    <img src={block.src} alt={block.title} className={cls.img} />
    {block.title && (
    <Text text={block.title} align="center" />
    )}
  </div>
));
