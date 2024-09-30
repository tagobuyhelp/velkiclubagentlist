import { SuperAgent } from '../models/super-agent.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { SubAdmin } from '../models/sub-admin.model.js';

// Create SuperAgent
const createSuperAgent = asyncHandler(async (req, res) => {
    const { fullname, app, phone, upline } = req.body;

    if (!fullname || !phone || !upline) {
        throw new ApiError(400, "Full Name, Phone, and Upline are required");
    }

    const existingSuperAgent = await SuperAgent.findOne({ phone });
    if (existingSuperAgent) {
        throw new ApiError(409, "This Super Agent already exists");
    }

    const superAgent = await SuperAgent.create({ fullname, app, phone, upline });
    const createdSuperAgent = await SuperAgent.findById(superAgent._id).populate('upline');

    return res.status(201).json(
        new ApiResponse(201, createdSuperAgent, "Super Agent created successfully")
    );
});

// Get All SuperAgents
const getAllSuperAgents = asyncHandler(async (req, res) => {
    const superAgents = await SuperAgent.find().populate('upline');
    return res.status(200).json(
        new ApiResponse(200, superAgents, "Super Agents retrieved successfully")
    );
});

// Get SuperAgent by ID
const getSuperAgentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const superAgent = await SuperAgent.findById(id).populate('upline');
    if (!superAgent) {
        throw new ApiError(404, "Super Agent not found");
    }

    return res.status(200).json(
        new ApiResponse(200, superAgent, "Super Agent retrieved successfully")
    );
});

// Get all Uplines (SubAdmins) with their Downlines (SuperAgents)
const getAllUplinesWithSuperAgents = asyncHandler(async (req, res) => {
    try {
        const uplines = await SubAdmin.find();

        const results = await Promise.all(
            uplines.map(async (upline) => {
                const superAgents = await SuperAgent.find({ upline: upline._id }).populate('upline');
                const downlineCount = superAgents.length;

                // Only return the upline if there are associated super agents
                return downlineCount > 0 ? {
                    upline,
                    superAgents,
                    downlineCount,
                } : null;
            })
        );

        // Filter out null values (uplines without super agents)
        const filteredResults = results.filter(result => result !== null);

        return res.status(200).json(
            new ApiResponse(200, filteredResults, "Uplines with Super Agents retrieved successfully")
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, "An error occurred while retrieving uplines")
        );
    }
});


// Update SuperAgent
const updateSuperAgent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { fullname, app, phone, upline } = req.body;

    const superAgent = await SuperAgent.findById(id);
    if (!superAgent) {
        throw new ApiError(404, "Super Agent not found");
    }

    superAgent.fullname = fullname || superAgent.fullname;
    superAgent.app = app || superAgent.app;
    superAgent.phone = phone || superAgent.phone;
    superAgent.upline = upline || superAgent.upline;

    await superAgent.save();

    const updatedSuperAgent = await SuperAgent.findById(id).populate('upline');

    return res.status(200).json(
        new ApiResponse(200, updatedSuperAgent, "Super Agent updated successfully")
    );
});

// Delete SuperAgent
const deleteSuperAgent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const superAgent = await SuperAgent.findByIdAndDelete(id);
    if (!superAgent) {
        throw new ApiError(404, "Super Agent not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Super Agent deleted successfully")
    );
});

export {
    createSuperAgent,
    getAllSuperAgents,
    getSuperAgentById,
    updateSuperAgent,
    deleteSuperAgent,
    getAllUplinesWithSuperAgents,
};
