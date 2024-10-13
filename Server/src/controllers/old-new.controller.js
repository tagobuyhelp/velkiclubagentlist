import { OldNew } from '../models/old-new-agent.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create OldNew Entry
const createOldNew = asyncHandler(async (req, res) => {
    const { oldId, newId, oldNumber, newNumber } = req.body;

    const oldNewEntry = await OldNew.create({ oldId, newId, oldNumber, newNumber });
    const createdOldNew = await OldNew.findById(oldNewEntry._id);

    return res.status(201).json(
        new ApiResponse(201, createdOldNew, "OldNew entry created successfully")
    );
});

// Read All OldNew Entries
const getAllOldNew = asyncHandler(async (req, res) => {
    const oldNewEntries = await OldNew.find(); // Retrieve all OldNew entries

    return res.status(200).json(
        new ApiResponse(200, oldNewEntries, "OldNew entries retrieved successfully")
    );
});

// Read OldNew Entry by ID
const getOldNewById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const oldNewEntry = await OldNew.findById(id);
    if (!oldNewEntry) {
        throw new ApiError(404, "OldNew entry not found");
    }

    return res.status(200).json(
        new ApiResponse(200, oldNewEntry, "OldNew entry retrieved successfully")
    );
});

// Update OldNew Entry
const updateOldNew = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { oldId, newId, oldNumber, newNumber } = req.body;

    const oldNewEntry = await OldNew.findById(id);
    if (!oldNewEntry) {
        throw new ApiError(404, "OldNew entry not found");
    }

    // Update fields
    oldNewEntry.oldId = oldId || oldNewEntry.oldId;
    oldNewEntry.newId = newId || oldNewEntry.newId;
    oldNewEntry.oldNumber = oldNumber || oldNewEntry.oldNumber;
    oldNewEntry.newNumber = newNumber || oldNewEntry.newNumber;

    await oldNewEntry.save();

    return res.status(200).json(
        new ApiResponse(200, oldNewEntry, "OldNew entry updated successfully")
    );
});

// Delete OldNew Entry
const deleteOldNew = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const oldNewEntry = await OldNew.findByIdAndDelete(id);
    if (!oldNewEntry) {
        throw new ApiError(404, "OldNew entry not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "OldNew entry deleted successfully")
    );
});

export {
    createOldNew,
    getAllOldNew,
    getOldNewById,
    updateOldNew,
    deleteOldNew
};
