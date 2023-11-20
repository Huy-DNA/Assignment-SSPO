import HomePage from '../pages/home/HomePage';
import PrintersPage from '../pages/printers/PrintersPage';
import FilesPage from '../pages/files/FilesPage';
<<<<<<< HEAD
import PrintFile from '../pages/printfile/PrintFile';
=======
import PrinterDetailPage from '../pages/printerDetail/PrinterDetailPage';
import FileDetailPage from '../pages/fileDetail/FileDetailPage';
import HistoryPage from '../pages/history/HistoryPage';
>>>>>>> 9d1e8679a2cddbf806194c19736946499c703904

export const guestRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
  { path: '/printers/:id', component: PrinterDetailPage },
];

export const managerRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
  { path: '/printers/:id', component: PrinterDetailPage },
  { path: '/history', component: HistoryPage },
];

export const userRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
  { path: '/printers/:id', component: PrinterDetailPage },
  { path: '/files', component: FilesPage },
<<<<<<< HEAD
  { path: '/printfile', component: PrintFile},
=======
  { path: '/files/:id', component: FileDetailPage },
>>>>>>> 9d1e8679a2cddbf806194c19736946499c703904
];
