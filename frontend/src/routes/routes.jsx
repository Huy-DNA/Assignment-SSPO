import HomePage from '../pages/home/HomePage';
import PrintersPage from '../pages/printers/PrintersPage';
import FilesPage from '../pages/files/FilesPage';
import PrinterDetailPage from '../pages/printerDetail/PrinterDetailPage';
import FileDetailPage from '../pages/fileDetail/FileDetailPage';

export const guestRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
  { path: '/printers/:id', component: PrinterDetailPage },
];

export const managerRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
  { path: '/printers/:id', component: PrinterDetailPage },
];

export const userRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
  { path: '/printers/:id', component: PrinterDetailPage },
  { path: '/files', component: FilesPage },
  { path: '/files/:id', component: FileDetailPage },
];
