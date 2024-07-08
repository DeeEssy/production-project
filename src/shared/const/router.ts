export enum AppRoute {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',

    // last
    NOT_FOUND = 'not_found',
  }

export const RoutePath: Record<AppRoute, string> = {
  [AppRoute.MAIN]: '/',
  [AppRoute.ABOUT]: 'about',
  [AppRoute.PROFILE]: 'profile', // + id
  [AppRoute.ARTICLES]: 'articles',
  [AppRoute.ARTICLE_DETAILS]: 'articles', // + id
  [AppRoute.ARTICLE_CREATE]: 'articles/new',
  [AppRoute.ARTICLE_EDIT]: 'articles/:id/edit',
  [AppRoute.ADMIN_PANEL]: 'admin',
  [AppRoute.FORBIDDEN]: 'forbidden',
  // last
  [AppRoute.NOT_FOUND]: '*',
};
