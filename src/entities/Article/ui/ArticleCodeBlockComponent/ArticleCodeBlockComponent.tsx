import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/Code';

import { ArticleCodeBlock } from '../../model/types/interfaces/articleBlocks';
import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(({ className, block }: ArticleCodeBlockComponentProps) => (
  <div className={classNames(cls.articleCodeBlockComponent, {}, [className])}>
    <Code text={block.code} />
  </div>
));
