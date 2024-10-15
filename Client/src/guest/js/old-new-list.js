import './home';
import '../styles/old-new-list.css';
import { API_URL } from '../../../constants';

const api = API_URL;

document.addEventListener('DOMContentLoaded', async function () {
    const tableBody = document.querySelector('#old-new tbody');

    try {
        // Fetch data from the API
        const response = await fetch(`${api}/oldnew`);
        const result = await response.json();
        console.log(result);

        if (result.statusCode === 200) {
            result.data.forEach( agent => {
                const { oldId, newId, oldNumber, newNumber } = agent;

            // Create a new table row
            const row = document.createElement('tr');

            // Old ID cell
            const oldIdCell = document.createElement('td');
            oldIdCell.textContent = oldId;
            row.appendChild(oldIdCell);

            // New ID cell
            const newIdCell = document.createElement('td');
            newIdCell.textContent = newId || '---'; // Default to '---' if no newId
            row.appendChild(newIdCell);

            // Old Number cell
            const oldNumberCell = document.createElement('td');
            oldNumberCell.textContent = oldNumber;
            oldNumberCell.classList.add('old-number');
            row.appendChild(oldNumberCell);

            // New Number cell
            const newNumberCell = document.createElement('td');
            newNumberCell.textContent = newNumber;
            newNumberCell.classList.add('new-number');
            row.appendChild(newNumberCell);
            tableBody.appendChild(row);
            })
            
            // Append the new row to the table body
            
        } else {
            console.error('No data found or invalid response');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});
