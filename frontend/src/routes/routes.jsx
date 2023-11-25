import HomePage from '../pages/home/HomePage';
import PrintersPage from '../pages/printers/PrintersPage';
import FilesPage from '../pages/files/FilesPage';
import PrintFile from '../pages/printfile/PrintFile';
import PrinterDetailPage from '../pages/printerDetail/PrinterDetailPage';
import FileDetailPage from '../pages/fileDetail/FileDetailPage';
import HistoryPage from '../pages/history/HistoryPage';
import UsersPage from '../pages/users/UserPage';
import BuyPaper from '../pages/buypaper/BuyPaper';
import PaymentMethod from '../pages/payment/Payment';

export const guestRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
  { path: '/printers/:id', component: PrinterDetailPage },
  { path: '/payment', component: PaymentMethod},
];

export const managerRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
  { path: '/printers/:id', component: PrinterDetailPage },
  { path: '/history', component: HistoryPage },
  { path: '/accounts', component: UsersPage },
];

export const userRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
  { path: '/printers/:id', component: PrinterDetailPage },
  { path: '/files', component: FilesPage },
  { path: '/printfile', component: PrintFile},
  { path: '/files/:id', component: FileDetailPage },
  { path: '/buypaper', component: BuyPaper},
  { path: '/payment', component: PaymentMethod},

];
