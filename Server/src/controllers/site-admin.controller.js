import { SiteAdmin } from '../models/site-admin.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler} from '../utils/asyncHandler.js';

//Create
const createSiteAdmin = asyncHandler( async (req, res) => {
    const { id, fullname, telegram, whatsapp, phone } = req.body;

    if (fullname === undefined || phone === undefined) {
        throw new ApiError(400, "Full Name or Phone is required");
    }
    
    const existingSiteAdmin = await SiteAdmin.findOne({ phone });
    if (existingSiteAdmin) {
        throw new ApiError(409, "This Site Admin already exists");
    }

    const siteadmin = await SiteAdmin.create({ id, fullname, telegram, whatsapp, phone });
    const createdSiteAdmin = await SiteAdmin.findById(siteadmin._id);

    return res.status(201).json(
        new ApiResponse(201, createdSiteAdmin, "Site Admin created successfully")
    );
});

// Read All
const getAllSiteAdmins = asyncHandler(async (req, res) => {
    const siteadmins = await SiteAdmin.find(); // Retrieve all Site Admins

    return res.status(200).json(
        new ApiResponse(200, siteadmins, "Site Admins retrieved successfully")
    );
});


// Read By Id
const getSiteAdminById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const siteadmin = await SiteAdmin.findById(id);
    if (!siteadmin) {
        throw new ApiError(404, "Site Admin not found");
    }

    return res.status(200).json(
        new ApiResponse(200, siteadmin, "Site Admin retrieved successfully")
    );
});

// Update
const updateSiteAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { fullname, telegram, whatsapp, phone } = req.body;

    const siteadmin = await SiteAdmin.findById(id);
    if (!siteadmin) {
        throw new ApiError(404, "Site Admin not found");
    }

    // Update fields
    siteadmin.fullname = fullname || siteadmin.fullname;
    siteadmin.telegram = telegram || siteadmin.telegram;
    siteadmin.whatsapp = whatsapp || siteadmin.whatsapp;
    siteadmin.phone = phone || siteadmin.phone;

    await siteadmin.save();

    return res.status(200).json(
        new ApiResponse(200, siteadmin, "Site Admin updated successfully")
    );
});

//Delete
const deleteSiteAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const siteadmin = await SiteAdmin.findByIdAndDelete(id);
    if (!siteadmin) {
        throw new ApiError(404, "Site Admin not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Site Admin deleted successfully")
    );
});

export {
    createSiteAdmin,
    updateSiteAdmin,
    deleteSiteAdmin,
    getSiteAdminById,
    getAllSiteAdmins,
};

