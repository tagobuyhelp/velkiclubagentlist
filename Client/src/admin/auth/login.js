import '../styles/login.css';
import { API_URL } from '../../../constants.js'

const api = API_URL

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const loginData = {
            email: email,
            password: password
        };

        fetch(`${api}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            const contentType = response.headers.get('content-type');
            if (!response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Unknown error occurred');
                    });
                } else {
                    return response.text().then(text => {
                        const errorMessageMatch = text.match(/<pre>Error: (.*?)<br>/);
                        const message = errorMessageMatch ? errorMessageMatch[1] : 'Unknown error occurred';
                        throw new Error(message);
                    });
                }
            }
            return response.json();
        })
        .then(data => {
            // Alert successful login and store tokens
            alert('Successfully logged in');
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('refreshToken', data.data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            //Redirect to dashboard
                window.location.href = '/dashboard.html';
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Login failed: ' + error.message);
        });
    });
});
