import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {
    createSuperAgent,
    getAllSuperAgents,
    getSuperAgentById,
    updateSuperAgent,
    deleteSuperAgent,
    getAllUplinesWithSuperAgents,
} from '../controllers/super-agent.controller.js';

const router = Router();

// Routes for SuperAgent operations
router.post('/superagent', verifyJWT, createSuperAgent);
router.get('/superagent', getAllSuperAgents);
router.get('/superagent/uplines', getAllUplinesWithSuperAgents);
router.get('/superagent/:id', getSuperAgentById);
router.put('/superagent/:id', verifyJWT, updateSuperAgent);
router.delete('/superagent/:id', verifyJWT, deleteSuperAgent);

export default router;
