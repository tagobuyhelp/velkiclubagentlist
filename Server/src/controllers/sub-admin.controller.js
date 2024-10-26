import { SubAdmin } from '../models/sub-admin.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { SiteAdmin } from '../models/site-admin.model.js';

// Create SubAdmin
const createSubAdmin = asyncHandler(async (req, res) => {
    const { fullname, app, phone, upline } = req.body;

    if (!fullname || !phone || !upline) {
        throw new ApiError(400, "Full Name, Phone, and Upline are required");
    }

    const existingSubAdmin = await SubAdmin.findOne({ phone });
    if (existingSubAdmin) {
        throw new ApiError(409, "This Sub Admin already exists");
    }

    const subAdmin = await SubAdmin.create({ fullname, app, phone, upline });
    const createdSubAdmin = await SubAdmin.findById(subAdmin._id).populate('upline'); // Populate all fields of upline

    return res.status(201).json(
        new ApiResponse(201, createdSubAdmin, "Sub Admin created successfully")
    );
});

// Get All SubAdmins
const getAllSubAdmins = asyncHandler(async (req, res) => {
    const subAdmins = await SubAdmin.find().populate('upline');
    return res.status(200).json(
        new ApiResponse(200, subAdmins, "Sub Admins retrieved successfully")
    );
});

// Get SubAdmin by ID
const getSubAdminById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const subAdmin = await SubAdmin.findOne({fullname: id}).populate('upline');
    if (!subAdmin) {
        throw new ApiError(404, "Sub Admin not found");
    }

    return res.status(200).json(
        new ApiResponse(200, subAdmin, "Sub Admin retrieved successfully")
    );
});

// Get all Uplines (SiteAdmins) with their Downlines (SubAdmins), skipping uplines with no downlines
const getAllUplinesWithSubAdmins = asyncHandler(async (req, res) => {
    try {
        // Retrieve SiteAdmins (uplines) in random order
        const uplines = await SiteAdmin.aggregate([{ $sample: { size: await SiteAdmin.countDocuments() } }]);

        const results = await Promise.all(
            uplines.map(async (upline) => {
                // Retrieve SubAdmins (downlines) in random order and populate 'upline' field
                const subAdmins = await SubAdmin.aggregate([
                    { $match: { upline: upline._id } },
                    { $sample: { size: await SubAdmin.countDocuments({ upline: upline._id }) } }
                ]);

                await SubAdmin.populate(subAdmins, { path: 'upline' });
                
                return {
                    upline,
                    subAdmins,
                    downlineCount: subAdmins.length // Count of downlines
                };
            })
        );

        // Filter out uplines with no downlines
        const filteredResults = results.filter(result => result.downlineCount > 0);

        // Return the filtered uplines with their downlines
        return res.status(200).json(
            new ApiResponse(200, filteredResults, "Uplines with downlines retrieved successfully")
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, "An error occurred while retrieving uplines")
        );
    }
});




// Update SubAdmin
const updateSubAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { fullname, app, phone, upline } = req.body;



    const subAdmin = await SubAdmin.findById(id);
    if (!subAdmin) {
        throw new ApiError(404, "SubAdmin not found");
    }

    // Update fields
    subAdmin.fullname = fullname || subAdmin.fullname;
    subAdmin.app = app || subAdmin.app;
    subAdmin.phone = phone || subAdmin.phone;
    subAdmin.upline = upline || subAdmin.upline;

    await subAdmin.save();
    
    const updatedSubAdmin = await SubAdmin.findById(id).populate('upline'); // Populate all fields of upline

    return res.status(200).json(
        new ApiResponse(200, updatedSubAdmin, "SubAdmin updated successfully")
    );
});

// Delete SubAdmin
const deleteSubAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const subAdmin = await SubAdmin.findByIdAndDelete(id);
    if (!subAdmin) {
        throw new ApiError(404, "SubAdmin not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "SubAdmin deleted successfully")
    );
});

export {
    createSubAdmin,
    getAllSubAdmins,
    getSubAdminById,
    updateSubAdmin,
    deleteSubAdmin,
    getAllUplinesWithSubAdmins,
};
