import { Router } from 'express';
import { SERVICE_NAME } from './constants';
import stockRoutes from './routes/stockRoutes';

// Encapsulates all api routes
const router = Router();

/**
 * GET /health
 * Healthcheck endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    service: SERVICE_NAME,
    status: 'available'
  });
})

router.use('/stocks', stockRoutes);

export default router;