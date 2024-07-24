import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import MainIcon from '@/shared/assets/icons/home.svg';
import ArticlesIcon from '@/shared/assets/icons/article.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';

import {
  getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/const/router';

import { SidebarItemType } from '../../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: MainIcon,
      text: 'sidebar_mainPage_link_text',
    },
    {
      path: getRouteAbout(),
      Icon: AboutIcon,
      text: 'sidebar_aboutPage_link_text',
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id.toString()),
        Icon: ProfileIcon,
        text: 'sidebar_profilePage_link_text',
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        Icon: ArticlesIcon,
        text: 'sidebar_articlesPage_link_text',
        authOnly: true,
      },
    );
  }

  return sidebarItemsList;
});
