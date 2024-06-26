import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import ArticlesIcon from 'shared/assets/icons/article-20-20.svg';
import { SidebarItemType } from '../../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
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
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: `${RoutePath.profile}/${userData.id}`,
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
    );
  }

  return sidebarItemsList;
});
