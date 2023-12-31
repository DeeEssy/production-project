import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib';
import { PageLoader } from 'widgets/PageLoader';

export const AppRouter = () => (
  <Routes>
    {Object.values(routeConfig).map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={(
          <Suspense fallback={<PageLoader />}>
            <div className={classNames('page-wrapper')}>{route.element}</div>
          </Suspense>
        )}
      />
    ))}
  </Routes>
);
