// Fetch campaigns from the server
async function fetchCampaigns() {
  try {
      const response = await fetch('http://localhost:8080/api/v1/campaigns', {
          method: 'GET',
      });

      const result = await response.json();

      if (response.ok && result.meta.status === 'success') {
          displayCampaigns(result.data);
      } else {
          alert('Failed to fetch campaigns. Please try again later.');
      }
  } catch (error) {
      console.error('Error fetching campaigns:', error);
      alert('An error occurred while fetching campaigns. Please try again later.');
  }
}

// Function to display campaigns in the page
function displayCampaigns(campaigns) {
  const campaignList = document.getElementById('campaignList');

  campaigns.forEach(campaign => {
      const campaignBox = document.createElement('div');
      campaignBox.classList.add('campaign-box');

      // Determine the image URL: If campaign has an image URL, fetch it; otherwise, use a default image
      console.log(campaign.image_url);
      const imageUrl = campaign.image_url ? `http://localhost:8080/${campaign.image_url}` : 'default-image.jpg';
      console.log(imageUrl);
      
      // Create the HTML structure for each campaign
      const campaignTitle = document.createElement('h3');
      campaignTitle.textContent = campaign.name;
      
      const campaignDescription = document.createElement('p');
      campaignDescription.innerHTML = `<strong>Description:</strong> ${campaign.short_description}`;
      
      const campaignGoal = document.createElement('p');
      campaignGoal.innerHTML = `<strong>Goal Amount:</strong> $${campaign.goal_amount}`;
      
      const campaignCurrent = document.createElement('p');
      campaignCurrent.innerHTML = `<strong>Current Amount:</strong> $${campaign.current_amount}`;
      
      const campaignSlug = document.createElement('p');
      campaignSlug.innerHTML = `<strong>Slug:</strong> ${campaign.slug}`;

      // Create an image element and set the source
      const img = new Image();
      img.src = imageUrl; // Set the source of the image immediately
      img.alt = campaign.name;
      img.width = 200; // Adjust size as needed
      
      // Append the image and other campaign details to the campaign box
      campaignBox.appendChild(img);
      campaignBox.appendChild(campaignTitle);
      campaignBox.appendChild(campaignDescription);
      campaignBox.appendChild(campaignGoal);
      campaignBox.appendChild(campaignCurrent);
      campaignBox.appendChild(campaignSlug);

      // Append the campaign box to the list
      campaignList.appendChild(campaignBox);
  });
}

// Back to homepage button event listener
document.getElementById('backToHomepage').addEventListener('click', function () {
  window.location.href = '../index.html'; // Adjust this path if needed
});

// Call the fetchCampaigns function when the page loads
fetchCampaigns();
