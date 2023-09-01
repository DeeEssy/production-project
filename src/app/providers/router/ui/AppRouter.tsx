import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib';

export const AppRouter = () => (
  <Routes>
    {Object.values(routeConfig).map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={
          <div className={classNames('page-wrapper')}>{route.element}</div>
            }
      />
    ))}
  </Routes>
);
