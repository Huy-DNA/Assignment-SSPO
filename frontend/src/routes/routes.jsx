import React from 'react';

import Home from '../pages/Home/Home';
import Logout from '../pages/Logout/Logout';
import PrinterManagement from '../components/PrinterManagement/PrinterManagement';
import AddPrinters from '../components/AddPrinters/AddPrinters';
import AccountManagement from '../components/AccounManagement/AccountManagement';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/manageprinter', component: PrinterManagement },
  { path: '/logout', component: Logout },
  { path: '/addprinters', component: AddPrinters },
  { path: '/manageaccount', component: AccountManagement },
  
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };