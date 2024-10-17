document.getElementById('page-title').innerHTML = 'Users';
import { API_URL } from "../../../constants";

const api = API_URL;

document.addEventListener("DOMContentLoaded", function () {
    const usersTableBody = document.querySelector(".users-table tbody");
    const apiEndpoint = `${api}/user/users`;

    const searchInput = document.getElementById("search");
    let users = [];

    function fetchusers() {
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                users = data.data; // Access the users from the "data" property
                populateTable(users); // Populate the table with the fetched data
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    fetchusers();

    function populateTable(users) {
        // Clear existing rows
        usersTableBody.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");


            // Name column (displayed second)
            const nameCell = document.createElement("td");
            const div = document.createElement("div");
            div.className = "nameCell-div";

            const p = document.createElement("p");
            p.textContent = user.fullname;

            const tag = document.createElement("span");
            tag.textContent = "User";

            p.appendChild(tag);

            const icon = document.createElement("i");
            icon.className = "fa-solid fa-circle-user";

            div.appendChild(icon);
            div.appendChild(p);

            nameCell.appendChild(div);
            row.appendChild(nameCell);

            const emailCell = document.createElement("td");
            emailCell.className = "emailCell";
            emailCell.innerHTML = user.email
            row.appendChild(emailCell);



            // View & Actions column with eye icon and popup display
            const viewCell = document.createElement("td");
            const viewButton = document.createElement("button");
            viewButton.className = "fa-solid fa-eye";
            viewButton.onclick = () => {
                document.getElementById("agent-view-box").style.display = "block";
                populateViewBox(user);
            };
            viewCell.appendChild(viewButton);
            row.appendChild(viewCell);

            usersTableBody.appendChild(row);
        });

        // Search functionality
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase();

            const filteredusers = users.filter(user => {
                return (
                    user.id.toLowerCase().includes(searchTerm) ||
                    user.fullname.toLowerCase().includes(searchTerm) ||
                    user.phone.toLowerCase().includes(searchTerm)
                );
            });

            populateTable(filteredusers); // Populate the table with the filtered data
        });
    }



    // Populate userViewBox
    function populateViewBox(user) {
        const fullnameInput = document.getElementById("full-name");
        const emailInput = document.getElementById("email");
        const newPasswordInput = document.getElementById("new-password");
        const updateButton = document.getElementById("update-button");

        // Check if the old password input already exists
        let oldPasswordInput = document.getElementById("old-password");
        if (!oldPasswordInput) {
            // Only create the old-password element if it doesn't exist
            const oldPasswordElement = document.createElement("input");
            oldPasswordElement.className = "old-password";
            oldPasswordElement.id = "old-password";
            oldPasswordElement.placeholder = "Enter your old password";
            document.querySelector(".form-group-2").appendChild(oldPasswordElement);
        }

        // Change Password
        updateButton.addEventListener('click', function () {
            const oldPasswordValue = document.getElementById("old-password").value;
            const newPasswordValue = newPasswordInput.value;

            const userData = {
                oldPassword: oldPasswordValue,
                newPassword: newPasswordValue,
            };

            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                window.location.href = '/login.html';
                return;
            }

            fetch(`${apiEndpoint}/${user}/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(userData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error Updating user');
                    }
                    return response.json();
                })
                .then(data => {
                    messageElement.innerText = "User Updated Successfully";
                    messageElement.style.color = "green";
                    setTimeout(() => {
                        messageElement.innerText = "";
                        window.location.reload();
                    }, 2000);
                })
                .catch(error => {
                    console.log('Error:', error);
                    messageElement.innerText = "Failed to update user";
                    messageElement.style.color = "red";
                    setTimeout(() => {
                        messageElement.innerText = "";
                    }, 2000);
                });
        });

        // User delete operation
        document.getElementById("delete-button").addEventListener('click', function () {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                window.location.href = '/login.html';
                return;
            }

            fetch(`${apiEndpoint}/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error Deleting user');
                    }
                    return response.json();
                })
                .then(data => {
                    messageElement.innerText = "User Deleted Successfully";
                    messageElement.style.color = "green";
                    setTimeout(() => {
                        messageElement.innerText = "";
                        window.location.reload();
                    }, 2000);
                })
                .catch(error => {
                    console.log('Error:', error);
                    messageElement.innerText = "Failed to delete user";
                    messageElement.style.color = "red";
                    setTimeout(() => {
                        messageElement.innerText = "";
                    }, 2000);
                });
        });
    }


    // Close popup function
    document.getElementById("closeAgentBox").addEventListener("click", function () {
        const userViewBox = document.getElementById("agent-view-box");
        if (userViewBox) {
            userViewBox.style.display = "none";
        }
    });

    // Function to handle closing of popups when clicking outside of them
    window.onclick = function (event) {
        const popup = document.getElementById("agent-view-box");
        if (popup && event.target == popup) {
            popup.style.display = 'none';
        }
    };

    // Add new user
    document.getElementById("add-new").addEventListener('click', function () {
        document.getElementById("full-name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("new-password").value = "";

        const messageElement = document.getElementById("messageElement");

        document.getElementById("agent-view-box").style.display = "block";
        const updateButton = document.getElementById("update-button");
        updateButton.innerText = "Publish";

        updateButton.addEventListener('click', function () {
            const fullnameInput = document.getElementById("full-name").value;
            const emailInput = document.getElementById("email").value;
            const newPasswordInput = document.getElementById("new-password").value;

            const inputuserData = {
                email: emailInput,
                password: newPasswordInput,
                fullname: fullnameInput,
            };

            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                window.location.href = '/login.html';
                return;
            }

            fetch(`${api}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(inputuserData)
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
                    messageElement.innerText = "User Registration Successfully!";
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