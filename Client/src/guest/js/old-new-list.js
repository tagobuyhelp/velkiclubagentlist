import './home';
import '../styles/old-new-list.css';


const data = [
    { oldId: 1643, newId: '---', oldNumber: '+855967045206', newNumber: '+855967289575' },
    { oldId: 2645, newId: '---', oldNumber: '+85515920557', newNumber: '+85570550371' },
    { oldId: 762, newId: '---', oldNumber: '+85570564955', newNumber: '+85570550371' },
    { oldId: 248, newId: '---', oldNumber: '+85586952208', newNumber: '+60172774046' },
    { oldId: 298, newId: '---', oldNumber: '+855962975689', newNumber: '+85570550371' },
    { oldId: 2418, newId: '---', oldNumber: '+85570550387', newNumber: '+855967289983' }
];

const tableBody = document.querySelector('#old-new tbody');

data.forEach(item => {
    const row = document.createElement('tr');

    const oldIdCell = document.createElement('td');
    oldIdCell.textContent = item.oldId;
    row.appendChild(oldIdCell);

    const newIdCell = document.createElement('td');
    newIdCell.textContent = item.newId;
    row.appendChild(newIdCell);

    const oldNumberCell = document.createElement('td');
    oldNumberCell.textContent = item.oldNumber;
    oldNumberCell.classList.add('old-number');
    row.appendChild(oldNumberCell);

    const newNumberCell = document.createElement('td');
    newNumberCell.textContent = item.newNumber;
    newNumberCell.classList.add('new-number');
    row.appendChild(newNumberCell);

    tableBody.appendChild(row);
});
