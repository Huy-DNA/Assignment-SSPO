import HomePage from '../pages/home/HomePage';
import PrintersPage from '../pages/printers/PrintersPage';
import Upload from '../pages/upload/Upload';

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/printers', component: PrintersPage },
  { path: '/upload', component: Upload },

];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };
