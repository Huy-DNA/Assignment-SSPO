import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { guestRoutes, managerRoutes, routeInfos, userRoutes } from './src/routes/routes';
import DefaultLayout from './src/layout/DefaultLayout/DefaultLayout';
import './styles.css';
import Breadcrumbs from './src/components/Breadcrumbs/Breadcrumbs';
import { LoginStatus } from './src/constants/loginStatus';

function App() {
  const loginStatus = useSelector(state => state.loginStatus.value);
  const routes = loginStatus === LoginStatus.NOT_LOGGED_IN
    ? guestRoutes
    : loginStatus === LoginStatus.USER
    ? userRoutes
    : managerRoutes;

  return (
    <BrowserRouter>
      <div>
        <Routes>
          {routes.map((route) => {
            const Layout = DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={(
                  <Layout>
                    <div className="mx-10 my-5">
                      <Breadcrumbs />
                    </div>
                    <div className="min-h-[70vh] m-10">
                      <Page />
                    </div>
                  </Layout>
                )}
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
