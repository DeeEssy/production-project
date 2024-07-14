import { AboutPage } from '@/pages/AboutPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { UserRole } from '@/entities/User';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import {
  AppRoute,
  getRouteAbout,
  getRouteAdmin,
  getRouteArticleCreate,
  getRouteArticleDetails,
  getRouteArticleEdit,
  getRouteForbidden,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoute, AppRoutesProps> = {
  [AppRoute.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoute.ABOUT]: {
    path: getRouteAbout(),
    element: <AboutPage />,
  },
  [AppRoute.PROFILE]: {
    path: getRouteProfile(':id'),
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoute.ARTICLES]: {
    path: getRouteArticles(),
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRoute.ARTICLE_DETAILS]: {
    path: getRouteArticleDetails(':id'),
    element: <ArticleDetailsPage />,
    authOnly: true,
  },

  [AppRoute.ARTICLE_CREATE]: {
    path: getRouteArticleCreate(),
    element: <ArticleEditPage />,
    authOnly: true,
  },

  [AppRoute.ARTICLE_EDIT]: {
    path: getRouteArticleEdit(':id'),
    element: <ArticleEditPage />,
    authOnly: true,
  },

  [AppRoute.ADMIN_PANEL]: {
    path: getRouteAdmin(),
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN],
  },

  [AppRoute.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },

  // last
  [AppRoute.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};
