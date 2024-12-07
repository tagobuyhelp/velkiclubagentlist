import { API_URL } from '../../../constants';


const api = API_URL;

document.getElementById('search-by-phone').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const phone = document.getElementById('phone-number').value;


    fetch(`${api}/agent-by-phone/${phone}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            console.log(`Response Status: ${response.status}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
    
            if (data.type === 'masteragent') {
                
                document.getElementById('table-title').innerText = 'MASTER AGENT LIST';
                const table = document.getElementById('agent-table');
                console.log(table);
                table.innerHTML = ''; // Clear the table before appending new content
    
                const thead = document.createElement('thead');
                const tbody = document.createElement('tbody');
    
                const headerRow = document.createElement('tr');
                const idTh = document.createElement('th');
                const nameTh = document.createElement('th');
                const phoneTh = document.createElement('th');
    
                idTh.innerText = 'ID NO';
                nameTh.innerText = 'AGENT';
                phoneTh.innerText = 'PHONE NUMBER';
    
                headerRow.appendChild(idTh);
                headerRow.appendChild(nameTh);
                headerRow.appendChild(phoneTh);
                thead.appendChild(headerRow);
    
                const tr = document.createElement('tr');
    
                const idTd = document.createElement('td');
                idTd.innerText = data.agent.id;
    
                const nameTd = document.createElement('td');
                nameTd.innerText = 'মাষ্টার এজেন্ট';
    
                const phoneTd = document.createElement('td');
                const link = document.createElement('a');
                link.href = data.agent.app;
                link.innerText = data.agent.phone;
                phoneTd.appendChild(link);
    
                tr.appendChild(idTd);
                tr.appendChild(nameTd);
                tr.appendChild(phoneTd);
    
                tbody.appendChild(tr);
    
                table.appendChild(thead);
                table.appendChild(tbody);
            } else if (data.type === 'superagent') {
                document.getElementById('table-title').innerText = 'SUPER AGENT LIST';
                const table = document.getElementById('agent-table');
                console.log(table);
                table.innerHTML = ''; // Clear the table before appending new content
    
                const thead = document.createElement('thead');
                const tbody = document.createElement('tbody');
    
                const headerRow = document.createElement('tr');
                const idTh = document.createElement('th');
                const nameTh = document.createElement('th');
                const phoneTh = document.createElement('th');
    
                idTh.innerText = 'ID NO';
                nameTh.innerText = 'AGENT';
                phoneTh.innerText = 'PHONE NUMBER';
    
                headerRow.appendChild(idTh);
                headerRow.appendChild(nameTh);
                headerRow.appendChild(phoneTh);
                thead.appendChild(headerRow);
    
                const tr = document.createElement('tr');
    
                const idTd = document.createElement('td');
                idTd.innerText = data.agent.id;
    
                const nameTd = document.createElement('td');
                nameTd.innerText = 'সুপার এজেন্ট';
    
                const phoneTd = document.createElement('td');
                const link = document.createElement('a');
                link.href = data.agent.app;
                link.innerText = data.agent.phone;
                phoneTd.appendChild(link);
    
                tr.appendChild(idTd);
                tr.appendChild(nameTd);
                tr.appendChild(phoneTd);
    
                tbody.appendChild(tr);
    
                table.appendChild(thead);
                table.appendChild(tbody);
            } else if (data.type === 'subadmin') {
                document.getElementById('table-title').innerText = 'SUB ADMIN LIST';
                const table = document.getElementById('agent-table');
                console.log(table);
                table.innerHTML = ''; // Clear the table before appending new content
    
                const thead = document.createElement('thead');
                const tbody = document.createElement('tbody');
    
                const headerRow = document.createElement('tr');
                const idTh = document.createElement('th');
                const nameTh = document.createElement('th');
                const phoneTh = document.createElement('th');
    
                idTh.innerText = 'ID NO';
                nameTh.innerText = 'AGENT';
                phoneTh.innerText = 'PHONE NUMBER';
    
                headerRow.appendChild(idTh);
                headerRow.appendChild(nameTh);
                headerRow.appendChild(phoneTh);
                thead.appendChild(headerRow);
    
                const tr = document.createElement('tr');
    
                const idTd = document.createElement('td');
                idTd.innerText = data.agent.id;
    
                const nameTd = document.createElement('td');
                nameTd.innerText = 'সাব এডমিন';
    
                const phoneTd = document.createElement('td');
                const link = document.createElement('a');
                link.href = data.agent.app;
                link.innerText = data.agent.phone;
                phoneTd.appendChild(link);
    
                tr.appendChild(idTd);
                tr.appendChild(nameTd);
                tr.appendChild(phoneTd);
    
                tbody.appendChild(tr);
    
                table.appendChild(thead);
                table.appendChild(tbody);
            } else {
                alert('Agent not found');
                document.getElementById('message').innerText =
                    'আপনার দেয়া নাম্বার টি এই মুহুর্তে এখন আর কেউ ব্যবহার করছে না। দয়া করে এই নাম্বার টি তে মেসেজ দেয়া থেকে বিরত থাকুন।';
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('An error occurred. Please check the phone number and try again. Start with +62 without spaces');
        });
    
});
