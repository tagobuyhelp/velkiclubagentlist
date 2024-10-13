import { MasterAgent } from '../models/master-agent.model.js';
import { SuperAgent } from '../models/super-agent.model.js';
import { SubAdmin } from '../models/sub-admin.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { SiteAdmin } from '../models/site-admin.model.js';

// Create MasterAgent
const createMasterAgent = asyncHandler(async (req, res) => {
    const { fullname, app, phone, upline } = req.body;

    if (!fullname || !phone || !upline) {
        throw new ApiError(400, "Full Name, Phone, and Upline are required");
    }

    const existingMasterAgent = await MasterAgent.findOne({ phone });
    if (existingMasterAgent) {
        throw new ApiError(409, "This MasterAgent already exists");
    }

    const masterAgent = await MasterAgent.create({ fullname, app, phone, upline });
    const createdMasterAgent = await MasterAgent.findById(masterAgent._id).populate('upline');

    return res.status(201).json(
        new ApiResponse(201, createdMasterAgent, "MasterAgent created successfully")
    );
});

// Get All MasterAgents
const getAllMasterAgents = asyncHandler(async (req, res) => {
    const masterAgents = await MasterAgent.find().populate('upline');

    return res.status(200).json(
        new ApiResponse(200, masterAgents, "MasterAgents retrieved successfully")
    );
});

// Get MasterAgent by ID
const getMasterAgentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const masterAgent = await MasterAgent.findOne({id}).populate('upline');
    if (!masterAgent) {
        throw new ApiError(404, "MasterAgent not found");
    }

    const superUplineId = masterAgent.upline._id;
    const superUpline = await SuperAgent.findById(superUplineId).populate('upline');
    const subAdminUplineid = superUpline.upline._id;
    const subAdminUpline = await SubAdmin.findById(subAdminUplineid).populate('upline');
    const siteAdminUplineid =  subAdminUpline.upline._id;
    const siteAdminUpline = await SiteAdmin.findById(siteAdminUplineid);

    return res.status(200).json(
        new ApiResponse(200, {masterAgent, superUpline, subAdminUpline, siteAdminUpline}, "MasterAgent retrieved successfully")
    );
});

// Update MasterAgent
const updateMasterAgent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { fullname, app, phone, upline } = req.body;

    const masterAgent = await MasterAgent.findById(id);
    if (!masterAgent) {
        throw new ApiError(404, "MasterAgent not found");
    }

    // Update fields
    masterAgent.fullname = fullname || masterAgent.fullname;
    masterAgent.app = app || masterAgent.app;
    masterAgent.phone = phone || masterAgent.phone;
    masterAgent.upline = upline || masterAgent.upline;

    await masterAgent.save();
    
    const updatedMasterAgent = await MasterAgent.findById(id).populate('upline');

    return res.status(200).json(
        new ApiResponse(200, updatedMasterAgent, "MasterAgent updated successfully")
    );
});

// Delete MasterAgent
const deleteMasterAgent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const masterAgent = await MasterAgent.findByIdAndDelete(id);
    if (!masterAgent) {
        throw new ApiError(404, "MasterAgent not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "MasterAgent deleted successfully")
    );
});

// Get all Uplines (SubAdmins) with their SuperAgents and MasterAgents
const getAllUplinesWithSuperAgentsAndMasterAgents = asyncHandler(async (req, res) => {
    try {
        // Find all SubAdmins (Uplines)
        const uplines = await SubAdmin.find();

        // For each upline, find its associated SuperAgents and their MasterAgents
        const results = await Promise.all(
            uplines.map(async (upline) => {
                const superAgents = await SuperAgent.find({ upline: upline._id }).populate('upline');

                const superAgentData = await Promise.all(
                    superAgents.map(async (superAgent) => {
                        const masterAgents = await MasterAgent.find({ upline: superAgent._id });
                        const masterAgentCount = masterAgents.length; // Count of MasterAgents

                        // Only return the superAgent data if there are associated master agents
                        return masterAgentCount > 0 ? {
                            superAgent,
                            masterAgents,
                            masterAgentCount,
                        } : null;
                    })
                );

                // Filter out null values (superAgents without master agents)
                const filteredSuperAgents = superAgentData.filter(agent => agent !== null);
                const superAgentCount = filteredSuperAgents.length; // Count of SuperAgents with MasterAgents

                // Only return the upline if there are associated super agents
                return superAgentCount > 0 ? {
                    upline,
                    superAgents: filteredSuperAgents,
                    superAgentCount,
                } : null;
            })
        );

        // Filter out null values (uplines without super agents)
        const filteredResults = results.filter(result => result !== null);

        return res.status(200).json(
            new ApiResponse(200, filteredResults, "Uplines with SuperAgents and MasterAgents retrieved successfully")
        );
    } catch (error) {
        // Handle any errors that occur during retrieval
        return res.status(500).json(
            new ApiResponse(500, null, "An error occurred while retrieving uplines")
        );
    }
});

//get random master agent 
const randomMasterAgent = asyncHandler(async (req, res) => {
    const randomMasterAgent = await MasterAgent.aggregate([
        { $sample: { size: 1 } }
    ]);

    if (randomMasterAgent.length > 0) {
        res.status(200).json(randomMasterAgent[0]);
    } else {
        res.status(404).json({ message: "No master agent found" });
    }
});



export {
    createMasterAgent,
    getAllMasterAgents,
    getMasterAgentById,
    updateMasterAgent,
    deleteMasterAgent,
    getAllUplinesWithSuperAgentsAndMasterAgents,
    randomMasterAgent,
};
