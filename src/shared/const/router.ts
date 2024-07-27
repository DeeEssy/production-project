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

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';

export const AppRouteByPathPattern: Record<string, AppRoute> = {
  [getRouteMain()]: AppRoute.MAIN,
  [getRouteAbout()]: AppRoute.ABOUT,
  [getRouteProfile(':id')]: AppRoute.PROFILE,
  [getRouteArticles()]: AppRoute.ARTICLES,
  [getRouteArticleDetails(':id')]: AppRoute.ARTICLE_DETAILS,
  [getRouteArticleCreate()]: AppRoute.ARTICLE_CREATE,
  [getRouteArticleEdit(':id')]: AppRoute.ARTICLE_EDIT,
  [getRouteAdmin()]: AppRoute.ADMIN_PANEL,
  [getRouteForbidden()]: AppRoute.FORBIDDEN,
};
