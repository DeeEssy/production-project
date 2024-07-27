import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { PageLoader } from '@/widgets/PageLoader';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserAuthInited, initAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { MainLayout } from '@/shared/layouts/MainLayout';

import { AppRouter } from './providers/router';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserAuthInited);

  useEffect(() => {
    dispatch(initAuthData());
    document.body.className = theme;
  }, [dispatch, theme]);

  if (!inited) {
    return (
      <div className={classNames('app', {}, [theme])}>
        <PageLoader />
      </div>
    );
  }

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
        <MainLayout
          header={<Navbar />}
          content={<AppRouter />}
          sidebar={<Sidebar />}
        />
      </Suspense>
    </div>
  );
};

export default App;
