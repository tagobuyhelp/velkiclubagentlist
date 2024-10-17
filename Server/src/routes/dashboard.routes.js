import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { agentsCounts } from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/agentscounts', verifyJWT , agentsCounts);


export default router;
