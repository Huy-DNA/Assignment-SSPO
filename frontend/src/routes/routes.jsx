import React from 'react';

import Home from '../pages/Home/Home';
import Logout from '../pages/Logout/Logout';
import PrinterManagement from '../pages/Home/PrinterManagement/PrinterManagement';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/manageprinter', component: PrinterManagement },
  { path: '/logout', component: Logout },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };