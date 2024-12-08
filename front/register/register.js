document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const occupation = document.getElementById('occupation').value;
    const password = document.getElementById('password').value;

    const emailData = { email: email };

    try {
        // Step 1: Check email availability
        const emailCheckResponse = await fetch('http://localhost:8080/api/v1/email_checkers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        if (!emailCheckResponse.ok) {
            throw new Error(`Email check failed: ${emailCheckResponse.status} - ${emailCheckResponse.statusText}`);
        }

        const emailCheckResult = await emailCheckResponse.json();

        if (!emailCheckResult.data.is_available) {
            alert(emailCheckResult.meta.message); // Notify the user if the email is already registered
            return;
        }

        // Step 2: Proceed with registration
        const userData = {
            name: name,
            email: email,
            occupation: occupation,
            password: password
        };

        const registerResponse = await fetch('http://localhost:8080/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!registerResponse.ok) {
            throw new Error(`Registration failed: ${registerResponse.status} - ${registerResponse.statusText}`);
        }

        const registerResult = await registerResponse.json();

        if (registerResult.meta && registerResult.meta.status === "success") {
            localStorage.setItem('jwtToken', registerResult.data.token);  // Save token to localStorage
            window.location.href = 'avatar/avatar.html';  // Navigate to the avatar upload page in the 'avatar' folder
        }
         else {
            alert('Something went wrong during registration!');
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
