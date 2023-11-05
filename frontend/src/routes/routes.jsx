import React from 'react';

import Home from '../pages/Home/Home';
import Logout from '../pages/Logout/Logout';
import PrinterManagement from '../components/PrinterManagement/PrinterManagement';
import AddPrinters from '../components/AddPrinters/AddPrinters';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/manageprinter', component: PrinterManagement },
  { path: '/logout', component: Logout },
  { path: '/addprinters', component: AddPrinters },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };