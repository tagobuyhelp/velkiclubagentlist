import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {
    createSiteAdmin,
    updateSiteAdmin,
    deleteSiteAdmin,
    getSiteAdminById,
    getAllSiteAdmins,
} from '../controllers/site-admin.controller.js';

const router = Router();

// Routes with JWT verification
router.post('/siteadmin', verifyJWT, createSiteAdmin);
router.get('/siteadmin',  getAllSiteAdmins);
router.get('/siteadmin/:id', getSiteAdminById);
router.put('/siteadmin/:id', verifyJWT, updateSiteAdmin);
router.delete('/siteadmin/:id', verifyJWT, deleteSiteAdmin);

export default router;
