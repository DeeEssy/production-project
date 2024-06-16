import { RouteProps } from 'react-router-dom';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';

type AppRoutesProps = RouteProps & {
  authOnly?: boolean
}

export enum AppRoute {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',

  // last
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoute, string> = {
  [AppRoute.MAIN]: '/',
  [AppRoute.ABOUT]: 'about',
  [AppRoute.PROFILE]: 'profile',
  // last
  [AppRoute.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoute, AppRoutesProps> = {
  [AppRoute.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoute.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />,
  },
  [AppRoute.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
    authOnly: true,
  },
  // last
  [AppRoute.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
