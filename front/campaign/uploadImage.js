document.addEventListener('DOMContentLoaded', function() {
    // Get campaign_id from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const campaignId = urlParams.get('campaign_id');

    if (!campaignId) {
        alert('Campaign ID is required.');
        return;
    }

    document.getElementById('uploadImageForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent page reload

        const isPrimary = document.getElementById('is_primary').checked;
        const fileInput = document.getElementById('file');

        const token = localStorage.getItem('jwtToken'); // Get JWT token from localStorage

        if (!token) {
            alert('You must be logged in to upload a campaign image.');
            return;
        }

        // Prepare the form data for upload
        const formData = new FormData();
        formData.append('campaign_id', campaignId);
        formData.append('is_primary', isPrimary);
        formData.append('file', fileInput.files[0]);

        try {
            const response = await fetch('http://localhost:8080/api/v1/campaign-images', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add bearer token for authorization
                },
                body: formData, // Send the form data as the body
            });

            const result = await response.json();

            // Log the status and the response for debugging
            console.log('Response Status:', response.status);
            console.log('Response Body:', result);

            // Check if the response is successful based on the meta.code
            if (response.ok && result.meta.code === 200) {
                displayResult(result); // Display success message
            } else {
                // Log the error for debugging
                console.error('Error in API response:', result);
                alert('Failed to upload image. Please try again later.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('An error occurred while uploading the image. Please try again later.');
        }
    });
});

// Function to display the result message after uploading the image
function displayResult(data) {
    const resultContainer = document.getElementById('resultContainer');

    console.log('Displaying result:', data); // Log the data being displayed

    // Show success message
    if (data.meta.code === 200) {
        resultContainer.innerHTML = `
            <h2>Image Uploaded Successfully</h2>
            <p>${data.meta.message}</p>
            <p>Image Uploaded: ${data.data.is_uploaded}</p>
            <button id="backToHomepage">Back to Homepage</button>
        `;

        // Add event listener to "Back to Homepage" button
        document.getElementById('backToHomepage').addEventListener('click', function() {
            window.location.href = '../index.html'; // Redirect to homepage
        });
    } else {
        resultContainer.innerHTML = `
            <h2>Error</h2>
            <p>${data.meta.message}</p>
        `;
    }
}

// Back to Homepage Button
document.getElementById('backToHomepage').addEventListener('click', function () {
    window.location.href = '../index.html'; // Navigate back to the homepage
});
