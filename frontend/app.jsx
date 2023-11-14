import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { publicRoutes } from './src/routes/routes';
import DefaultLayout from './src/Layout/DefaultLayout/DefaultLayout';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
                    <Page />
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
