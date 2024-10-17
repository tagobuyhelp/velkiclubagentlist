import { MasterAgent } from '../models/master-agent.model.js';
import { SuperAgent } from '../models/super-agent.model.js';
import { SubAdmin } from '../models/sub-admin.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { SiteAdmin } from '../models/site-admin.model.js';

const agentsCounts = asyncHandler(async (req, res) => {
    const masteragent = await MasterAgent.find();
    const masteragentcounts = masteragent.length;

    const superagent = await SuperAgent.find();
    const superagentcounts = superagent.length;

    const subadmin = await SubAdmin.find();
    const subadmincounts = subadmin.length;

    const siteadmin = await SiteAdmin.find();
    const siteadmincounts = siteadmin.length;


    res.status(200).json(
        new ApiResponse(200, {masteragentcounts, superagentcounts, subadmincounts, siteadmincounts}, 'success')
    )
})


export {
    agentsCounts,
}