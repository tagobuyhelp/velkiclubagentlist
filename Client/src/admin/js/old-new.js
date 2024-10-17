document.getElementById('page-title').innerHTML = 'Old New'
import { API_URL } from "../../../constants";

const api = API_URL;

document.addEventListener("DOMContentLoaded", function () {
    const agentsTableBody = document.querySelector(".agents-table tbody");
    const apiEndpoint = `${api}/oldnew`;

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

            // Old Id column (displayed first)
            const oldidCell = document.createElement("td");
            oldidCell.textContent = agent.oldId;
            row.appendChild(oldidCell);

            // New Id column (displayed first)
            const newidCell = document.createElement("td");
            newidCell.textContent = agent.newId;
            row.appendChild(newidCell);



            // Old Number column
            const phoneNumberCell = document.createElement("td");
            phoneNumberCell.textContent = agent.oldNumber;
            row.appendChild(phoneNumberCell);

            // New Number column
            const newphoneNumberCell = document.createElement("td");
            newphoneNumberCell.textContent = agent.newNumber;
            row.appendChild(newphoneNumberCell);

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
        const oldIdInput = document.getElementById("old-id");
        const newIdInput = document.getElementById("new-id");
        const oldNumberInput = document.getElementById("old-number");
        const newNumberInput = document.getElementById("new-number");
        const updateButton = document.getElementById("update-button");

        oldIdInput.value = agent.oldId || '';
        newIdInput.value = agent.newId || '';
        oldNumberInput.value = agent.oldNumber || '';
        newNumberInput.value = agent.newNumber || '';

        // Update agent
        updateButton.addEventListener('click', function () {
            const oldIdInput = document.getElementById("old-id").value;
            const newIdInput = document.getElementById("new-id").value;
            const oldNumberInput = document.getElementById("old-number").value;
            const newNumberInput = document.getElementById("new-number").value;
            const messageElement = document.getElementById("messageElement");

            const agentData = {
                oldId: oldIdInput,
                newId: newIdInput,
                oldNumber: oldNumberInput,
                newNumber: newNumberInput
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
                    messageElement.innerText = "Old-New Updated Successfully";
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
                    messageElement.innerText = "Old-New Deleted Successfully";
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
        document.getElementById("old-id").value = "";
        document.getElementById("new-id").value = "";
        document.getElementById("old-number").value = "";
        document.getElementById("new-number").value = "";

        const messageElement = document.getElementById("messageElement");

        document.getElementById("agent-view-box").style.display = "block";
        const updateButton = document.getElementById("update-button");
        updateButton.innerText = "Publish";

        updateButton.addEventListener('click', function () {
            const oldIdInput = document.getElementById("old-id").value;
            const newIdInput = document.getElementById("new-id").value;
            const oldNumberInput = document.getElementById("old-number").value;
            const newNumberInput = document.getElementById("new-number").value;


            const inputAgentData = {
                oldId: oldIdInput,
                newId: newIdInput,
                oldNumber: oldNumberInput,
                newNumber: newNumberInput
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
                    messageElement.innerText = "Old New Created Successfully!";
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
