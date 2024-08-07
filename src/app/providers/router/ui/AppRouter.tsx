import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageLoader } from '@/widgets/PageLoader';
import { AppRoutesProps } from '@/shared/types/router';

import { routeConfig } from '../config/routeConfig';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        {route.element}
      </Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
      />
    );
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map((route) => renderWithWrapper(route))}
    </Routes>
  );
});
