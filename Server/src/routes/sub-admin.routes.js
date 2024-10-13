import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {
    createSubAdmin,
    getAllSubAdmins,
    getSubAdminById,
    updateSubAdmin,
    deleteSubAdmin,
    getAllUplinesWithSubAdmins,
} from '../controllers/sub-admin.controller.js';

const router = Router();

// Routes for SubAdmin operations
router.post('/subadmin', verifyJWT, createSubAdmin);
router.get('/subadmin', getAllSubAdmins);
router.get('/subadmin/uplines', getAllUplinesWithSubAdmins);
router.get('/subadminbyid/:id', getSubAdminById);
router.put('/subadmin/:id', verifyJWT, updateSubAdmin);
router.delete('/subadmin/:id', verifyJWT, deleteSubAdmin);

export default router;
