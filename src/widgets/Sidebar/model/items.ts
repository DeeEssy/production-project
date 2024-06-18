import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import ArticlesIcon from 'shared/assets/icons/article-20-20.svg';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    Icon: MainIcon,
    text: 'sidebar_mainPage_link_text',
  },
  {
    path: RoutePath.about,
    Icon: AboutIcon,
    text: 'sidebar_aboutPage_link_text',
  },
  {
    path: RoutePath.profile,
    Icon: ProfileIcon,
    text: 'sidebar_profilePage_link_text',
    authOnly: true,
  },
  {
    path: RoutePath.articles,
    Icon: ArticlesIcon,
    text: 'sidebar_articlesPage_link_text',
    authOnly: true,
  },
];
