import { screen } from '@testing-library/react';

import { ComponentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { getRouteAbout, getRouteAdmin, getRouteProfile } from '@/shared/const/router';

import { AppRouter } from './AppRouter';
import { UserRole } from '@/entities/User';

describe('AppRouter', () => {
  test('Page is rendering', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAbout(),
    });

    const page = await screen.findByTestId('aboutPage');
    expect(page).toBeInTheDocument();
  });

  test('Page not found', async () => {
    ComponentRender(<AppRouter />, {
      route: '/dsadasdasds',
    });

    const page = await screen.findByTestId('notFoundPage');
    expect(page).toBeInTheDocument();
  });

  test('Redirect to main page for unauth users who try to open secure route', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteProfile('1'),
    });

    const page = await screen.findByTestId('mainPage');
    expect(page).toBeInTheDocument();
  });

  test('Permission for auth user to get to secure route', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: {
          _inited: true,
          authData: {},
        },
      },
    });

    const page = await screen.findByTestId('profilePage');
    expect(page).toBeInTheDocument();
  });

  test('Not enough roles, a route is forbidden', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {
          _inited: true,
          authData: {},
        },
      },
    });

    const page = await screen.findByTestId('forbiddenPage');
    expect(page).toBeInTheDocument();
  });

  test('Enough roles, a route is allowed', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {
          _inited: true,
          authData: {
            roles: [UserRole.ADMIN],
          },
        },
      },
    });

    const page = await screen.findByTestId('adminPanelPage');
    expect(page).toBeInTheDocument();
  });
});
