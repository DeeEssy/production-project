import { getUserAuthData } from 'entities/User';
import { Suspense, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib';
import { PageLoader } from 'widgets/PageLoader';

export const AppRouter = memo(() => {
  const isAuth = useSelector(getUserAuthData);

  const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
    if (route.authOnly && !isAuth) {
      return false;
    }

    return true;
  }), [isAuth]);

  return (
    <Routes>
      {Object.values(routes).map((route) => (
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
});
