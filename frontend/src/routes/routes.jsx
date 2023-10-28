import React from 'react';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Logout from '../pages/Logout/Logout';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };