import HomePage from '../pages/home/HomePage';
import PrintersPage from '../pages/printers/PrintersPage';
import FilesPage from '../pages/files/FilesPage';
import PrintFile from '../pages/printfile/PrintFile';

export const guestRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
];

export const managerRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
];

export const userRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
  { path: '/files', component: FilesPage },
  { path: '/printfile', component: PrintFile},
];
