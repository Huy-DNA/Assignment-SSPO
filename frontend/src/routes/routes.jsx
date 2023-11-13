import React from 'react';

import Home from '../pages/Home/Home';
import PrinterManagement from '../pages/PrinterManagement/PrinterManagement';
import AddPrinters from '../pages/AddPrinters/AddPrinters';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/manageprinter', component: PrinterManagement },
  { path: '/addprinters', component: AddPrinters },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };