import { API_URL } from '../../../constants.js';
const api = API_URL;
document.getElementById('page-title').innerHTML = 'Dashboard';

document.addEventListener('DOMContentLoaded', async function () {
    // Clear count display initially
    const masterAgentCountElement = document.getElementById('master-agent-count');
    const superAgentCountElement = document.getElementById('super-agent-count');
    const subAdminCountElement = document.getElementById('sub-admin-count');
    const siteAdminCountElement = document.getElementById('site-admin-count');

    // Set initial empty text
    masterAgentCountElement.innerHTML = '';
    superAgentCountElement.innerHTML = '';
    subAdminCountElement.innerHTML = '';
    siteAdminCountElement.innerHTML = '';

    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            window.location.href = '/login.html';
            return;
        }

        // Fetch agent counts from the API
        const response = await fetch(`${api}/agentscounts`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch agent counts');
        }

        const data = await response.json();


        // Update the DOM with the received counts
        masterAgentCountElement.innerHTML = data.data.masteragentcounts;
        superAgentCountElement.innerHTML = data.data.superagentcounts;
        subAdminCountElement.innerHTML = data.data.subadmincounts;
        siteAdminCountElement.innerHTML = data.data.siteadmincounts;

    } catch (e) {
        console.error('Error fetching agent counts:', e);
    }
});
