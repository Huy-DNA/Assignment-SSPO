import React from 'react';

import Layout from '../Layout/Layout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };