// Redirect to Register Page
document.getElementById('registerButton').addEventListener('click', function() {
  window.location.href = 'register/register.html'; // Adjust this path if necessary
});

// Redirect to Login Page
document.getElementById('loginButton').addEventListener('click', function() {
  window.location.href = 'login/login.html'; // Adjust this path if necessary
});

// Redirect to User Profile Page
document.getElementById('goToProfileButton').addEventListener('click', function() {
  // Check if the user is logged in by checking if the token exists
  const token = localStorage.getItem('jwtToken');
  if (token) {
    window.location.href = 'profile/profile.html'; // Go to profile page if the user is logged in
  } else {
    alert('You must be logged in to view your profile.');
    window.location.href = 'login/login.html'; // Redirect to login page if not logged in
  }
});

// Event listener for Sign Out button
document.getElementById('signOutButton').addEventListener('click', function () {
  // Remove the JWT token from localStorage
  localStorage.removeItem('jwtToken'); 

  // Notify the user and redirect to the login page (or homepage)
  alert('You have been logged out.');
  window.location.href = 'login/login.html'; // Redirect to login page
});

// Redirect to Show All Campaigns Page
document.getElementById('viewCampaignsButton').addEventListener('click', function() {
  window.location.href = 'campaign/showAllCampaign.html'; // Adjust this path if necessary
});
