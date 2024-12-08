document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const campaignId = urlParams.get('campaign_id');
  const token = localStorage.getItem('jwtToken');

  if (!token) {
      alert('You must be logged in to edit a campaign.');
      window.location.href = '../index.html'; // Redirect to homepage if no token
      return;
  }

  if (!campaignId) {
      alert('Campaign ID is required.');
      window.location.href = 'myCampaign.html'; // Redirect if no campaign ID in URL
      return;
  }

  // Function to fetch the current campaign data
  async function fetchCampaignData() {
      try {
          const response = await fetch(`http://localhost:8080/api/v1/campaigns/${campaignId}`, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });

          const result = await response.json();

          if (response.ok && result.meta.status === 'success') {
              populateForm(result.data);
          } else {
              alert('Failed to fetch campaign data. Please try again later.');
          }
      } catch (error) {
          console.error('Error fetching campaign data:', error);
          alert('An error occurred while fetching campaign data.');
      }
  }

  // Populate the form with current campaign data
  function populateForm(campaign) {
      document.getElementById('name').value = campaign.name;
      document.getElementById('short_description').value = campaign.short_description;
      document.getElementById('description').value = campaign.description;
      document.getElementById('goal_amount').value = campaign.goal_amount;
      document.getElementById('perks').value = campaign.perks;
  }

  // Handle form submission to update the campaign
  document.getElementById('editCampaignForm').addEventListener('submit', async function(event) {
      event.preventDefault();

      const updatedCampaign = {
          name: document.getElementById('name').value,
          short_description: document.getElementById('short_description').value,
          description: document.getElementById('description').value,
          goal_amount: parseInt(document.getElementById('goal_amount').value, 10),
          perks: document.getElementById('perks').value
      };

      try {
          const response = await fetch(`http://localhost:8080/api/v1/campaigns/${campaignId}`, {
              method: 'PUT',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedCampaign)
          });

          const result = await response.json();

          if (response.ok && result.meta.status === 'success') {
              alert('Campaign updated successfully!');
              window.location.href = 'myCampaign.html'; // Redirect to the campaigns page
          } else {
              alert('Failed to update campaign. Please try again later.');
          }
      } catch (error) {
          console.error('Error updating campaign:', error);
          alert('An error occurred while updating the campaign.');
      }
  });

  // Fetch the campaign data when the page loads
  fetchCampaignData();
});
