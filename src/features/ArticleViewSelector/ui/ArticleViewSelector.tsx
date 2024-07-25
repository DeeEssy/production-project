import { memo } from 'react';

import { ArticleView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view?: ArticleView,
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view = ArticleView.SMALL, onViewClick } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <Card
      className={classNames(
        cls.articleViewSelector,
        {},
        [className],
      )}
      border="m-round"
    >
      <HStack gap="8">
        {viewTypes.map((viewType) => (
          <Icon
            clickable
            key={viewType.view}
            onClick={onClick(viewType.view)}
            Svg={viewType.icon}
            className={classNames('', {
              [cls.notSelected]: viewType.view !== view,
            })}
          />
        ))}
      </HStack>
    </Card>
  );
});
