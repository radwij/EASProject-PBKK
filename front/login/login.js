document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = { email: email, password: password };

    try {
        // Send login request
        const loginResponse = await fetch('http://localhost:8080/api/v1/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (!loginResponse.ok) {
            throw new Error(`Login failed: ${loginResponse.status} - ${loginResponse.statusText}`);
        }

        const loginResult = await loginResponse.json();

        if (loginResult.meta && loginResult.meta.status === "success") {
            document.getElementById('output').textContent = JSON.stringify(loginResult, null, 4);
            alert(loginResult.meta.message); // Notify the user of successful login
            
            // Save the token to localStorage
            localStorage.setItem('jwtToken', loginResult.data.token); // Save the token
        } else {
            alert('Something went wrong during login!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

// Back to Homepage Button
document.getElementById('backToHomepage').addEventListener('click', function () {
    window.location.href = '../index.html'; // Navigate back to the homepage
});
