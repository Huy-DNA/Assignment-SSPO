import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import { publicRoutes } from './src/routes/routes';
import DefaultLayout from './src/Layout/DefaultLayout/DefaultLayout';
import logo from './assets/images/hcmutlogo.jpg';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = DefaultLayout;
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Layout> <Page /> </Layout>} />;
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;