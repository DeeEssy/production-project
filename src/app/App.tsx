import { Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { classNames } from 'shared/lib';

const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>Toggle theme</button>
        <Link to={'/'}>Главная</Link>
        <Link to={'/about'}>About</Link>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path={'/about'} element={<AboutPage/>} />
                <Route path={'/'} element={<MainPage/>}/>
            </Routes>
        </Suspense>
    </div>
  )
}

export default App;