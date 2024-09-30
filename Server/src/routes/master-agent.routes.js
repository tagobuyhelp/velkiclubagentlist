import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {
    createMasterAgent,
    getAllMasterAgents,
    getMasterAgentById,
    updateMasterAgent,
    deleteMasterAgent,
    getAllUplinesWithSuperAgentsAndMasterAgents,
} from '../controllers/master-agent.controller.js';

const router = Router();

router.post('/masteragent', verifyJWT, createMasterAgent);
router.get('/masteragent', getAllMasterAgents);
router.get('/masteragent/uplines', getAllUplinesWithSuperAgentsAndMasterAgents);
router.get('/masteragent/:id', getMasterAgentById);
router.put('/masteragent/:id', verifyJWT, updateMasterAgent);
router.delete('/masteragent/:id', verifyJWT, deleteMasterAgent);

export default router;
