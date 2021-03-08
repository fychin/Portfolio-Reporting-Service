import * as stockController from '../controllers/stocks';
import { Router } from 'express';

const router = Router();

/**
 * GET /api/stocks/:ticker
 */
router.get('/:ticker', stockController.fetchReportByTicker);

export default router;