import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@/app/providers/ThemeProvider';
import { classNames } from '@/shared/lib';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserAuthInited, userActions } from '@/entities/User';
import { PageLoader } from '@/widgets/PageLoader';
import { AppRouter } from './providers/router';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const inited = useSelector(getUserAuthInited);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <div className={classNames('main')}>
          <Sidebar />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
};

export default App;
