import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { publicRoutes } from './src/routes/routes';
import DefaultLayout from './src/layout/DefaultLayout/DefaultLayout';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {publicRoutes.map((route) => {
            const Layout = DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={(
                  <Layout>
                    <div className="h-screen m-10">
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
