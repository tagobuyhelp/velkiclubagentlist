import { CustomerService } from '../models/customer-service.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create Customer Service
const createCustomerService = asyncHandler(async (req, res) => {
    const { id, type, whatsapp, phone } = req.body;

    if (!type || !phone) {
        throw new ApiError(400, "Type and Phone are required");
    }

    const existingCustomerService = await CustomerService.findOne({ phone });
    if (existingCustomerService) {
        throw new ApiError(409, "This Customer Service entry already exists");
    }

    const customerService = await CustomerService.create({ id, type, whatsapp, phone });
    const createdCustomerService = await CustomerService.findById(customerService._id);

    return res.status(201).json(
        new ApiResponse(201, createdCustomerService, "Customer Service entry created successfully")
    );
});

// Read All Customer Services
const getAllCustomerServices = asyncHandler(async (req, res) => {
    const customerServices = await CustomerService.find(); // Retrieve all entries

    return res.status(200).json(
        new ApiResponse(200, customerServices, "Customer Service entries retrieved successfully")
    );
});

// Read Customer Service by ID
const getCustomerServiceById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const customerService = await CustomerService.findById(id);
    if (!customerService) {
        throw new ApiError(404, "Customer Service entry not found");
    }

    return res.status(200).json(
        new ApiResponse(200, customerService, "Customer Service entry retrieved successfully")
    );
});

// Update Customer Service
const updateCustomerService = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type, whatsapp, phone } = req.body;

    const customerService = await CustomerService.findById(id);
    if (!customerService) {
        throw new ApiError(404, "Customer Service entry not found");
    }

    // Update fields
    customerService.type = type || customerService.type;
    customerService.whatsapp = whatsapp || customerService.whatsapp;
    customerService.phone = phone || customerService.phone;

    await customerService.save();

    return res.status(200).json(
        new ApiResponse(200, customerService, "Customer Service entry updated successfully")
    );
});

// Delete Customer Service
const deleteCustomerService = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const customerService = await CustomerService.findByIdAndDelete(id);
    if (!customerService) {
        throw new ApiError(404, "Customer Service entry not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Customer Service entry deleted successfully")
    );
});

export {
    createCustomerService,
    getAllCustomerServices,
    getCustomerServiceById,
    updateCustomerService,
    deleteCustomerService
};
