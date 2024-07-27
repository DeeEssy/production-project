import { ReactElement } from 'react';
import { AppRoute } from '@/shared/const/router';
import { ScrollToolBar } from '@/widgets/ScrollToolBar';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

export function useAppToolbar() {
  const appRoute = useRouteChange();

  const toolbarByAppRoute: OptionalRecord<AppRoute, ReactElement> = {
    [AppRoute.ARTICLES]: <ScrollToolBar />,
    [AppRoute.ARTICLE_DETAILS]: <ScrollToolBar />,
  };

  return toolbarByAppRoute[appRoute];
}
