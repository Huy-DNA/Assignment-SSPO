import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { routeInfos } from './src/routes/routes';
import DefaultLayout from './src/layout/DefaultLayout/DefaultLayout';
import './styles.css';
import Breadcrumbs from './src/components/Breadcrumbs/Breadcrumbs';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {routeInfos.map((route) => {
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
