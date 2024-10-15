import '../styles/index.css'
import { inject } from '@vercel/analytics';
inject();

const api = process.env.API_URL;

console.log(process.env.API_URL);

document.addEventListener('DOMContentLoaded', function () {
    let agentId = document.getElementById('agent-id');
    let agentUrl = document.getElementById('agent-url')
    
    let  wpUrl = document.getElementById('wp-link')
    let wpNumber = document.getElementById('agent-phone')
    let phoneUrl = document.getElementById('phone-url')


    
    
    fetch(`${api}/randommasteragent`)
    .then(response => response.json())
    .then(data => {
        agentId.innerHTML = data.id;
        agentUrl.setAttribute('href', data.app)
        wpUrl.setAttribute('href', data.app)
        wpNumber.innerHTML = data.phone;
        phoneUrl.setAttribute('href', data.app)
    })
    .catch(error => console.error('Error:', error));


    
})

