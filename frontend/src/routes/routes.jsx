import HomePage from '../pages/home/HomePage';
import PrintersPage from '../pages/printers/PrintersPage';

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };
