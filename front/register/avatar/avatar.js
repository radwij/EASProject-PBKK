document.getElementById('avatarForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('avatar');
    const file = fileInput.files[0]; // Get the selected file
    const formData = new FormData();
    formData.append('avatar', file); // Append the file to form data

    const token = localStorage.getItem('jwtToken'); // Get the JWT token from localStorage

    if (!token) {
        alert('You must be logged in to upload an avatar.');
        return;
    }

    try {
        // Send the file to the server
        const response = await fetch('http://localhost:8080/api/v1/avatars', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        const result = await response.json();
        console.log(result);  // Log the result to check the response

        if (response.ok && result.meta.status === 'success') {
            alert(result.meta.message); // Notify the user of success
            // Show the Back to Homepage button after successful upload
            document.getElementById('backToHomepage').style.display = 'inline-block';
        } else {
            alert('Failed to upload profile picture. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading the profile picture. Please try again later.');
    }
});

// Handle the "Back to Homepage" button click
document.getElementById('backToHomepage').addEventListener('click', function () {
    window.location.href = '../../index.html'; // Navigate to the homepage
});
