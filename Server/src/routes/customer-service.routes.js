import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {
    createCustomerService,
    getAllCustomerServices,
    getCustomerServiceById,
    updateCustomerService,
    deleteCustomerService
} from '../controllers/customer-service.controller.js';

const router = Router();

// Routes for CustomerService operations
router.post('/customerservice', verifyJWT, createCustomerService);
router.get('/customerservice', getAllCustomerServices);
router.get('/customerservice/:id', getCustomerServiceById);
router.put('/customerservice/:id', verifyJWT, updateCustomerService);
router.delete('/customerservice/:id', verifyJWT, deleteCustomerService);

export default router;
