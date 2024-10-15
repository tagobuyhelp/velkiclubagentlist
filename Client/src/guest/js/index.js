import '../styles/index.css'
const { inject } = require('@vercel/analytics')
inject();

document.addEventListener('DOMContentLoaded', function () {
    let agentId = document.getElementById('agent-id');
    let agentUrl = document.getElementById('agent-url')
    
    let  wpUrl = document.getElementById('wp-link')
    let wpNumber = document.getElementById('agent-phone')
    let phoneUrl = document.getElementById('phone-url')


    
    
    fetch('https://server.velkiclubagentlist.com/randommasteragent')
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