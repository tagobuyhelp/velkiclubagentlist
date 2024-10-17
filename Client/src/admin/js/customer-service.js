document.getElementById('page-title').innerHTML = 'Customer Service'

import { API_URL } from "../../../constants";

const api = API_URL;

document.addEventListener("DOMContentLoaded", function () {
    const agentsTableBody = document.querySelector(".agents-table tbody");
    const apiEndpoint = `${api}/customerservice`;

    const searchInput = document.getElementById("search");
    let agents = [];

    function fetchAgents() {
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                agents = data.data; // Access the agents from the "data" property
                populateTable(agents); // Populate the table with the fetched data
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    fetchAgents();

    function populateTable(agents) {
        // Clear existing rows
        agentsTableBody.innerHTML = "";

        agents.forEach(agent => {
            const row = document.createElement("tr");

            // ID NO column (displayed first)
            const idCell = document.createElement("td");
            idCell.textContent = agent.id;
            row.appendChild(idCell);

            // Name column (displayed second)
            const nameCell = document.createElement("td");
            const div = document.createElement("div");
            div.className = "nameCell-div";

            const p = document.createElement("p");
            p.textContent = agent.type;

            const tag = document.createElement("span");
            tag.textContent = "Customer Service"; // You can customize the tag as needed.

            p.appendChild(tag);

            const icon = document.createElement("i");
            icon.className = "fa-solid fa-circle-user";

            div.appendChild(icon);
            div.appendChild(p);

            nameCell.appendChild(div);
            row.appendChild(nameCell);



            // WhatsApp Link column (with icon)
            const appLinkCell = document.createElement("td");
            const appLink = document.createElement("a");
            appLink.href = agent.whatsapp;
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
            phoneNumberCell.textContent = agent.phone;
            row.appendChild(phoneNumberCell);

            // View & Actions column with eye icon and popup display
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

        // Search functionality
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase();

            const filteredAgents = agents.filter(agent => {
                return (
                    agent.id.toLowerCase().includes(searchTerm) ||
                    agent.fullname.toLowerCase().includes(searchTerm) ||
                    agent.phone.toLowerCase().includes(searchTerm)
                );
            });

            populateTable(filteredAgents); // Populate the table with the filtered data
        });
    }



    // Populate AgentViewBox
    function populateViewBox(agent) {
        const fullnameInput = document.getElementById("full-name");
        const appLinkInput = document.getElementById("app-link");
        const phone_numberInput = document.getElementById("phone-number");
        const updateButton = document.getElementById("update-button");

        fullnameInput.value = agent.type || '';
        phone_numberInput.value = agent.phone || '';
        appLinkInput.value = agent.whatsapp || '';

        // Update agent
        updateButton.addEventListener('click', function () {
            const fullnameInput = document.getElementById("full-name").value;
            const appLinkInput = document.getElementById("app-link").value;
            const phone_numberInput = document.getElementById("phone-number").value;
            const messageElement = document.getElementById("messageElement");

            const agentData = {
                type: fullnameInput,
                whatsapp: appLinkInput,
                phone: phone_numberInput
            };

            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                window.location.href = '/login.html';
                return;
            }

            fetch(`${apiEndpoint}/${agent._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(agentData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error Updating agent');
                    }
                    return response.json();
                })
                .then(data => {
                    messageElement.innerText = "Agent Updated Successfully";
                    messageElement.style.color = "green";
                    setTimeout(() => {
                        messageElement.innerText = "";
                        window.location.reload();
                    }, 2000);
                })
                .catch(error => {
                    console.log('Error:', error);
                    messageElement.innerText = "Failed to update agent";
                    messageElement.style.color = "red";
                    setTimeout(() => {
                        messageElement.innerText = "";
                    }, 2000);
                });
        });

        // Agent delete operation
        document.getElementById("delete-button").addEventListener('click', function () {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                window.location.href = '/login.html';
                return;
            }

            fetch(`${apiEndpoint}/${agent._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error Deleting agent');
                    }
                    return response.json();
                })
                .then(data => {
                    messageElement.innerText = "Agent Deleted Successfully";
                    messageElement.style.color = "green";
                    setTimeout(() => {
                        messageElement.innerText = "";
                        window.location.reload();
                    }, 2000);
                })
                .catch(error => {
                    console.log('Error:', error);
                    messageElement.innerText = "Failed to delete agent";
                    messageElement.style.color = "red";
                    setTimeout(() => {
                        messageElement.innerText = "";
                    }, 2000);
                });
        });
    }

    // Close popup function
    document.getElementById("closeAgentBox").addEventListener("click", function () {
        const agentViewBox = document.getElementById("agent-view-box");
        if (agentViewBox) {
            agentViewBox.style.display = "none";
        }
    });

    // Function to handle closing of popups when clicking outside of them
    window.onclick = function (event) {
        const popup = document.getElementById("agent-view-box");
        if (popup && event.target == popup) {
            popup.style.display = 'none';
        }
    };

    // Add new agent
    document.getElementById("add-new").addEventListener('click', function () {
        document.getElementById("full-name").value = "";
        document.getElementById("phone-number").value = "";
        document.getElementById("app-link").value = "";
    
        const messageElement = document.getElementById("messageElement");

        document.getElementById("agent-view-box").style.display = "block";
        const updateButton = document.getElementById("update-button");
        updateButton.innerText = "Publish";

        updateButton.addEventListener('click', function () {
            const fullnameInput = document.getElementById("full-name").value;
            const phone_numberInput = document.getElementById("phone-number").value;
            const appLinkInput = document.getElementById("app-link").value;

            const inputAgentData = {
                type: fullnameInput, 
                whatsapp: appLinkInput,
                phone: phone_numberInput,
            };

            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                window.location.href = '/login.html';
                return;
            }

            fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(inputAgentData)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => {
                            throw new Error(err.message || response.statusText);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    messageElement.innerText = "Customer Service Created Successfully!";
                    messageElement.style.color = "green";
                    setTimeout(() => {
                        messageElement.innerText = "";
                        window.location.reload();
                    }, 2000);
                })
                .catch(error => {
                    messageElement.innerText = `Error: ${error.message}`;
                    messageElement.style.color = "red";
                    setTimeout(() => {
                        messageElement.innerText = "";
                    }, 2000);
                });
        });
    });
});
