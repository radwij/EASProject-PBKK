document.getElementById('createCampaignForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const shortDescription = document.getElementById('short_description').value;
    const description = document.getElementById('description').value;
    const goalAmount = document.getElementById('goal_amount').value;
    const perks = document.getElementById('perks').value;

    const token = localStorage.getItem('jwtToken'); // Get JWT token from localStorage

    if (!token) {
        alert('You must be logged in to create a campaign.');
        return;
    }

    const campaignData = {
        name: name,
        short_description: shortDescription,
        description: description,
        goal_amount: parseInt(goalAmount, 10),
        perks: perks
    };

    console.log(campaignData);

    try {
        const response = await fetch('http://localhost:8080/api/v1/campaigns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(campaignData)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.meta.status === 'success') {
            alert('Campaign created successfully');
            
            // Redirect to upload image page and pass campaign_id in the URL
            window.location.href = `uploadImage.html?campaign_id=${result.data.id}`;
        } else {
            alert('Failed to create campaign. Please try again.');
        }
    } catch (error) {
        console.error('Error creating campaign:', error);
        alert('An error occurred while creating the campaign. Please try again later.');
    }
});
