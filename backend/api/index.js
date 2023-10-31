import { Router } from 'express';
import PrintersAPI from './printers/index.js';

const router = Router();

router.use('/printers', PrintersAPI);

export default router;
