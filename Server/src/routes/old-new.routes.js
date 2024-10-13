import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {
    createOldNew,
    getAllOldNew,
    getOldNewById,
    updateOldNew,
    deleteOldNew
} from '../controllers/old-new.controller.js';

const router = Router();

// Routes for OldNew operations
router.post('/oldnew', verifyJWT, createOldNew);
router.get('/oldnew', getAllOldNew);
router.get('/oldnew/:id', getOldNewById);
router.put('/oldnew/:id', verifyJWT, updateOldNew);
router.delete('/oldnew/:id', verifyJWT, deleteOldNew);

export default router;
