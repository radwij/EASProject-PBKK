// Get the JWT token from localStorage
const token = localStorage.getItem('jwtToken');

if (!token) {
    alert('You must be logged in to view your profile.');
    window.location.href = '../index.html'; // Redirect to homepage if no token
}

async function fetchUserProfile() {
    try {
        // Make GET request to the user fetch API
        const response = await fetch('http://localhost:8080/api/v1/users/fetch', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Include the JWT token in the header
            }
        });

        const result = await response.json();

        if (response.ok && result.meta.status === 'success') {
            // Populate the profile information with the data
            document.getElementById('userName').textContent = result.data.name;
            document.getElementById('userOccupation').textContent = result.data.occupation;
            document.getElementById('userEmail').textContent = result.data.emaill;  // Correct the typo in the API (emaill -> email)

            // Check if the image_url exists and set the image source
            const userImageElement = document.getElementById('userImage');
            const imageUrl = result.data.image_url ? `http://localhost:8080/${result.data.image_url}` : 'path/to/default/image.jpg'; // Prepend the base URL
            userImageElement.src = imageUrl;
        } else {
            alert('Failed to fetch user data. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        alert('An error occurred while fetching user data. Please try again later.');
    }
}

// Fetch and display the user's profile
fetchUserProfile();

// Redirect back to the homepage when the button is clicked
document.getElementById('backToHomepage').addEventListener('click', function () {
    window.location.href = '../index.html'; // Adjust the path if needed
});
