// Function to switch between pages by loading different HTML content
function navigateTo(page) {
    const mainContent = document.getElementById('main-content');

    // Based on the page name, change the content
    switch (page) {
        case 'home':
            mainContent.innerHTML = '<h1>Welcome to Velci Club</h1><p>This is the home page.</p>';
            document.title = 'Velci Club - Home';
            break;
        case 'customer-service-list':
            mainContent.innerHTML = '<h1>Customer Service List</h1><p>List of customer service agents.</p>';
            document.title = 'Velci Club - Customer Service List';
            break;
        case 'old-new':
            mainContent.innerHTML = '<h1>Old New Page</h1><p>Information about Old and New agents.</p>';
            document.title = 'Velci Club - Old New';
            break;
        case 'admin-list':
            mainContent.innerHTML = '<h1>Admin List</h1><p>List of admins in Velci Club.</p>';
            document.title = 'Velci Club - Admin List';
            break;
        case 'sub-admin-list':
            mainContent.innerHTML = '<h1>Sub Admin List</h1><p>List of sub-admins in Velci Club.</p>';
            document.title = 'Velci Club - Sub Admin List';
            break;
        case 'super-agent-list':
            mainContent.innerHTML = '<h1>Super Agent List</h1><p>List of super agents in Velci Club.</p>';
            document.title = 'Velci Club - Super Agent List';
            break;
        case 'master-agent-list':
            mainContent.innerHTML = '<h1>Master Agent List</h1><p>List of master agents in Velci Club.</p>';
            document.title = 'Velci Club - Master Agent List';
            break;
        default:
            mainContent.innerHTML = '<h1>Page Not Found</h1>';
            document.title = '404 - Page Not Found';
            break;
    }

    // Update the URL without reloading the page
    window.history.pushState({}, '', `/${page}`);
}

// Load the appropriate page based on the URL when the page is loaded
window.onload = function () {
    const path = window.location.pathname.substring(1); // Remove the leading slash
    navigateTo(path || 'home'); // Default to home if no path is found
};

// Handle back/forward navigation via the browser's buttons
window.onpopstate = function () {
    const path = window.location.pathname.substring(1);
    navigateTo(path || 'home');
};
