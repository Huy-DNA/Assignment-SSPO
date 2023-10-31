import { Router } from 'express';
import PrintersAPI from './printers/index.js';
import ReportsAPI from './reports/index.js';

const router = Router();

router.use('/printers', PrintersAPI);
router.use('/reports', ReportsAPI);

export default router;
