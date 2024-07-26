import {
  memo, MutableRefObject, ReactNode, useRef, UIEvent,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { StateSchema } from '@/app/providers/StoreProvider';
import { ScrollSaverActions, getScrollSaverByPath } from '@/features/ScrollSaver';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';

import cls from './Page.module.scss';

interface PageProps extends TestProps{
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

const SCROLL_CHECKER_DELAY = 1000;

export const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const scrollPosition = useSelector((state: StateSchema) => getScrollSaverByPath(state, location.pathname));

  useInfiniteScroll({
    triggerRef,
    wrapperRef: undefined,
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(ScrollSaverActions.setScrollPosition({ position: e.currentTarget.scrollTop, path: location.pathname }));
  }, SCROLL_CHECKER_DELAY);

  return (
    <div
      ref={wrapperRef}
      className={classNames(cls.page, {}, [className])}
      onScroll={onScroll}
      id={PAGE_ID}
      data-testid={props['data-testid'] ?? 'page'}
    >
      {children}
      {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
    </div>
  );
});
