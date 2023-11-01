import { Router } from 'express';
import PrintersAPI from './printers/index.js';
import ReportsAPI from './reports/index.js';
import FilesAPI from './files/index.js';

const router = Router();

router.use('/printers', PrintersAPI);
router.use('/reports', ReportsAPI);
router.use('/files', FilesAPI);

export default router;
