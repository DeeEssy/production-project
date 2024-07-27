import { memo } from 'react';

import { ScrollToTop } from '@/features/ScrollToTop';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToolbar.module.scss';
import { VStack } from '@/shared/ui/Stack';

interface ScrollToolBarProps {
    className?: string;
}

export const ScrollToolBar = memo((props: ScrollToolBarProps) => {
  const { className } = props;

  return (
    <VStack
      justify="center"
      align="center"
      max
      className={classNames(cls.scrollToolBar, {}, [className])}
    >
      <ScrollToTop />
    </VStack>
  );
});
