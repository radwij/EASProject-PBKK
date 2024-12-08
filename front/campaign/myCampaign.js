document.addEventListener('DOMContentLoaded', function() {
  // Function to decode the JWT token and extract the user_id
  function getUserIdFromToken() {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
          alert('You must be logged in to view your campaigns.');
          window.location.href = '../index.html'; // Redirect to homepage if no token
          return null;
      }

      // Decode the JWT token and extract user_id (assuming the user_id is in the payload)
      try {
          const payload = JSON.parse(atob(token.split('.')[1])); // Decode base64 payload
          return payload.user_id;  // Extract the user_id from the decoded token (adjust key based on your token structure)
      } catch (e) {
          console.error('Invalid token', e);
          return null;
      }
  }

  // Fetch the campaigns created by the user
  async function fetchUserCampaigns() {
      const userId = getUserIdFromToken(); // Get user_id from token
      if (!userId) return; // If no user_id, exit the function

      try {
          // Make GET request to the campaigns API, using the dynamic user_id
          const response = await fetch(`http://localhost:8080/api/v1/campaigns?user_id=${userId}`);

          const result = await response.json();

          if (response.ok && result.meta.status === 'success') {
              // Populate the campaigns
              displayCampaigns(result.data);
          } else {
              alert('Failed to fetch campaigns. Please try again later.');
          }
      } catch (error) {
          console.error('Error fetching campaigns:', error);
          alert('An error occurred while fetching campaigns. Please try again later.');
      }
  }

  // Function to display the campaigns
  function displayCampaigns(campaigns) {
      const container = document.getElementById('campaignsContainer');
      
      // Check if there are campaigns to display
      if (campaigns.length === 0) {
          container.innerHTML = '<p>No campaigns found.</p>';
          return;
      }

      campaigns.forEach(campaign => {
          // Create a campaign box
          const campaignBox = document.createElement('div');
          campaignBox.className = 'campaign-box';

          // Add the campaign image
          const img = document.createElement('img');
          img.src = `http://localhost:8080/${campaign.image_url}`;
          img.alt = campaign.name;
          campaignBox.appendChild(img);

          // Add the campaign name
          const name = document.createElement('h3');
          name.textContent = campaign.name;
          campaignBox.appendChild(name);

          // Add the campaign short description
          const shortDescription = document.createElement('p');
          shortDescription.textContent = campaign.short_description;
          campaignBox.appendChild(shortDescription);

          // Add the goal amount and current amount
          const goalAmount = document.createElement('p');
          goalAmount.className = 'goal';
          goalAmount.textContent = `Goal: $${campaign.goal_amount}`;
          campaignBox.appendChild(goalAmount);

          const currentAmount = document.createElement('p');
          currentAmount.textContent = `Current: $${campaign.current_amount}`;
          campaignBox.appendChild(currentAmount);

          // Create the Edit button
          const editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.className = 'edit-button';
          editButton.addEventListener('click', function() {
              window.location.href = `editCampaign.html?campaign_id=${campaign.id}`;
          });

          // Add the edit button to the campaign box
          campaignBox.appendChild(editButton);

          // Append the campaign box to the container
          container.appendChild(campaignBox);
      });
  }

  // Fetch and display the user's campaigns when the page loads
  fetchUserCampaigns();

  // Redirect to the homepage when the button is clicked
  document.getElementById('backToHomepage').addEventListener('click', function () {
      window.location.href = '../index.html'; // Adjust the path if needed
  });
});
