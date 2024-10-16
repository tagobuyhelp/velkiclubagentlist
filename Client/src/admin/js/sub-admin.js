document.getElementById('page-title').innerHTML = 'Sub Admin';

import { API_URL } from "../../../constants";

const api = API_URL;

document.addEventListener("DOMContentLoaded", function () {
    const agentsTableBody = document.querySelector(".agents-table tbody");
    const apiEndpoint = `${api}/subadmin`;
    const searchInput = document.getElementById("search");
    let agents = [];

    function fetchAgents() {
        fetch(apiEndpoint)
            .then((response) => response.json())
            .then((data) => {
                agents = data.data; // Store the fetched data (use `data.data` as per your response structure)
                populateTable(agents); // Populate the table with the fetched data
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    fetchAgents();

    function populateTable(agents) {
        // Clear existing rows
        agentsTableBody.innerHTML = "";

        agents.forEach((agent) => {
            const row = document.createElement("tr");

            // Name column
            const nameCell = document.createElement("td");
            const div = document.createElement("div");
            div.className = "nameCell-div";

            const p = document.createElement("p");
            p.textContent = agent.fullname;

            const tag = document.createElement("span");
            tag.textContent = "Sub Admin";

            p.appendChild(tag);

            const icon = document.createElement("i");
            icon.className = "fa-solid fa-circle-user";

            div.appendChild(icon);
            div.appendChild(p);

            nameCell.appendChild(div);
            row.appendChild(nameCell);

            // ID column
            const idCell = document.createElement("td");
            idCell.className = "idCell";
            const idCellH1 = document.createElement("h1");
            idCellH1.textContent = agent.id; // Use `id` field from agent
            idCell.appendChild(idCellH1);
            row.appendChild(idCell);

            // App Link column (WhatsApp link)
            const appLinkCell = document.createElement("td");
            const appLink = document.createElement("a");
            appLink.href = agent.app; // Use `app` for WhatsApp link
            appLink.target = "_blank";

            const whatsappIcon = document.createElement("i");
            whatsappIcon.className = "fab fa-whatsapp";
            whatsappIcon.style.color = "#25D366";
            whatsappIcon.style.fontSize = "20px";

            appLink.appendChild(whatsappIcon);
            appLinkCell.appendChild(appLink);
            row.appendChild(appLinkCell);

            // Phone Number column
            const phoneNumberCell = document.createElement("td");
            phoneNumberCell.textContent = agent.phone; // Use `phone` field
            row.appendChild(phoneNumberCell);

            // View column with eye icon and popup display
            const viewCell = document.createElement("td");
            const viewButton = document.createElement("button");
            viewButton.className = "fa-solid fa-eye";
            viewButton.onclick = () => {
                document.getElementById("agent-view-box").style.display = "block";
                populateViewBox(agent);
            };
            viewCell.appendChild(viewButton);
            row.appendChild(viewCell);

            agentsTableBody.appendChild(row);
        });
    }

    // Live data filter
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();

        const filteredAgents = agents.filter((agent) => {
            return (
                agent.id.toLowerCase().includes(searchTerm) ||
                agent.fullname.toLowerCase().includes(searchTerm) ||
                agent.phone.toLowerCase().includes(searchTerm)
            );
        });

        populateTable(filteredAgents); // Populate the table with the filtered data
    });

    // Populate AgentViewBox
    function populateTable(agents) {
        // Clear existing rows
        agentsTableBody.innerHTML = "";

        agents.forEach((agent) => {
            const row = document.createElement("tr");

            // ID NO column using <h1> inside <td>
            const idCell = document.createElement("td");
            idCell.className = "idCell";

            const idHeader = document.createElement("h1");
            idHeader.textContent = agent.id; // Assuming 'id' is available in the agent object
            idCell.appendChild(idHeader);

            row.appendChild(idCell);

            // Name column
            const nameCell = document.createElement("td");
            const nameDiv = document.createElement("div");
            nameDiv.className = "nameCell-div";

            const nameP = document.createElement("p");
            nameP.textContent = agent.fullname; // Assuming 'fullname' is available in the agent object
            const tag = document.createElement("span");
            tag.textContent = "Sub Admin"; // Replace with dynamic role if needed
            nameP.appendChild(tag);

            const icon = document.createElement("i");
            icon.className = "fa-solid fa-circle-user";

            nameDiv.appendChild(icon);
            nameDiv.appendChild(nameP);

            nameCell.appendChild(nameDiv);
            row.appendChild(nameCell);

            // App Link column
            const appLinkCell = document.createElement("td");
            const appLink = document.createElement("a");
            appLink.href = agent.app; // Assuming 'app' is available in the agent object
            appLink.target = "_blank";

            // WhatsApp icon
            const whatsappIcon = document.createElement("i");
            whatsappIcon.className = "fab fa-whatsapp";
            whatsappIcon.style.color = "#25D366"; // Customize color if needed
            whatsappIcon.style.fontSize = "20px"; // Customize size if needed

            appLink.appendChild(whatsappIcon);
            appLinkCell.appendChild(appLink);
            row.appendChild(appLinkCell);

            // Phone Number column
            const phoneNumberCell = document.createElement("td");
            phoneNumberCell.textContent = agent.phone; // Assuming 'phone' is available in the agent object
            row.appendChild(phoneNumberCell);

            // View & Actions column
            const viewActionsCell = document.createElement("td");

            // View button
            const viewButton = document.createElement("button");
            viewButton.className = "fa-solid fa-eye";
            viewButton.onclick = () => {
                document.getElementById("agent-view-box").style.display = "block";
                populateViewBox(agent);
            };

            viewActionsCell.appendChild(viewButton);
            row.appendChild(viewActionsCell);

            // Append the row to the table body
            agentsTableBody.appendChild(row);
        });
    }

    // Populate AgentViewBox
    function populateViewBox(agent) {
        const uplineSelect = document.getElementById("upline");
        const fullnameInput = document.getElementById("full-name");
        const app_linkInput = document.getElementById("app-link");
        const phone_numberInput = document.getElementById("phone-number");
        const updateButton = document.getElementById("update-button");
        const messageElement = document.getElementById("messageElement");
    
        // Clear previous options
        uplineSelect.innerHTML = "";
    
        updateButton.innerText = "Update";
    
        // Set initial values from the agent object
        fullnameInput.value = agent.fullname || "";
        app_linkInput.value = agent.app || "";
        phone_numberInput.value = agent.phone || "";
    
        // Fetch and populate uplines
        fetchAndPopulateUplines(agent.upline ? agent.upline._id : "");
    
        // Fetch and populate uplines function
        function fetchAndPopulateUplines(selectedUplineId) {
            const baseUrl = api;
    
            fetch(`${baseUrl}/siteadmin`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok " + response.statusText);
                    }
                    return response.json();
                })
                .then((data) => {
                    // Access the 'data' array from the response
                    const siteAdmins = data.data;
    
                    // Clear existing options in uplineSelect
                    uplineSelect.innerHTML = "";
    
                    // Add a default "No Upline" option
                    const defaultOption = document.createElement("option");
                    defaultOption.text = "No Upline";
                    defaultOption.value = "";
                    uplineSelect.appendChild(defaultOption);
    
                    // Populate the dropdown with new options
                    siteAdmins.forEach((element) => {
                        const option = document.createElement("option");
                        option.textContent = element.fullname;
                        option.value = element._id;
    
                        // Mark the option as selected if it matches the current upline
                        if (element._id === selectedUplineId) {
                            option.selected = true;
                        }
    
                        uplineSelect.appendChild(option);
                    });
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    
        // Update agent logic
        updateButton.onclick = function () {
            const agentData = {
                fullname: fullnameInput.value,
                app: app_linkInput.value,
                phone: phone_numberInput.value,
                upline: uplineSelect.value, // Update with selected upline
            };
    
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                window.location.href = '/login.html';
                return;
            }
    
            fetch(`${apiEndpoint}/${agent._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(agentData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error Updating agent");
                    }
                    return response.json();
                })
                .then(() => {
                    messageElement.innerText = "Agent Updated Successfully";
                    messageElement.style.color = "green";
                    setTimeout(() => {
                        messageElement.innerText = "";
                        window.location.reload();
                    }, 2000);
                })
                .catch((error) => {
                    console.log("Error:", error);
                    messageElement.innerText = "Failed to update agent";
                    messageElement.style.color = "red";
                    setTimeout(() => {
                        messageElement.innerText = "";
                    }, 2000);
                });
        };
    
        // Delete agent logic
        document.getElementById("delete-button").onclick = function () {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                window.location.href = '/login.html';
                return;
            }
    
            fetch(`${apiEndpoint}/${agent._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error Deleting agent");
                    }
                    return response.json();
                })
                .then(() => {
                    messageElement.innerText = "Agent Deleted Successfully";
                    messageElement.style.color = "green";
                    setTimeout(() => {
                        messageElement.innerText = "";
                        window.location.reload();
                    }, 2000);
                })
                .catch((error) => {
                    console.log("Error:", error);
                    messageElement.innerText = "Failed to delete agent";
                    messageElement.style.color = "red";
                    setTimeout(() => {
                        messageElement.innerText = "";
                    }, 2000);
                });
        };
    }

    // Close popup function
    document.getElementById("closeAgentBox").addEventListener("click", function () {
        document.getElementById("agent-view-box").style.display = "none";
    });

    // Handle closing of popups when clicking outside of them
    window.onclick = function (event) {
        const popups = ["agent-view-box"];

        popups.forEach(function (popupId) {
            const popup = document.getElementById(popupId);
            if (popup && event.target === popup) {
                popup.style.display = "none";
            }
        });
    };

    // Add new Agent
    document.getElementById("add-new").addEventListener("click", function () {
        document.getElementById("upline").value = "";
        document.getElementById("upline").innerText = "";
        document.getElementById("full-name").value = "";
        document.getElementById("app-link").value = "";
        document.getElementById("phone-number").value = "";
        const messageElement = document.getElementById("messageElement");

        document.getElementById("agent-view-box").style.display = "block";

        const updateButton = document.getElementById("update-button");
        updateButton.innerText = "Publish";

        const selectUpline = document.getElementById("upline");

        const baseUrl = api;

        // Fetch the site admins data
        fetch(`${baseUrl}/siteadmin`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
            .then((responseData) => {
                // Access the 'data' field from the response
                const siteAdmins = responseData.data;

                // Clear existing options
                selectUpline.innerHTML = "";

                // Populate the select field with site admins
                siteAdmins.forEach((admin) => {
                    const option = document.createElement("option");
                    option.textContent = admin.fullname;
                    option.value = admin._id;
                    selectUpline.appendChild(option);
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

        updateButton.onclick = function () {
            const selectedUpline = document.getElementById("upline").value;
            const fullnameInput = document.getElementById("full-name").value;
            const app_linkInput = document.getElementById("app-link").value;
            const phone_numberInput = document.getElementById("phone-number").value;

            const inputAgentData = {
                fullname: fullnameInput,
                app: app_linkInput,
                phone: phone_numberInput,
                upline: selectedUpline,
            };

            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                window.location.href = '/login.html';
                return;
            }

            fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(inputAgentData),
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((err) => {
                            throw new Error(err.message || response.statusText);
                        });
                    }
                    return response.json();
                })
                .then(() => {
                    messageElement.innerText = "New Sub Admin Created Successfully!";
                    messageElement.style.color = "green";
                    setTimeout(() => {
                        messageElement.innerText = "";
                        window.location.reload();
                    }, 2000);
                })
                .catch((error) => {
                    if (error.message.includes("E11000")) {
                        messageElement.innerText = "Error: The phone number is already in use.";
                        messageElement.style.color = "yellow";
                        setTimeout(() => {
                            messageElement.innerText = "";
                            window.location.reload();
                        }, 2000);
                    } else {
                        messageElement.innerText = `Error: ${error.message}`;
                        messageElement.style.color = "red";
                        setTimeout(() => {
                            messageElement.innerText = "";
                            window.location.reload();
                        }, 2000);
                    }
                    console.log(error);
                });
        };
    });

});
