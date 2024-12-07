<template>
    <div>
      <h1>Crowdfunding Home</h1>
  
      <div v-if="isLoggedIn">
        <p>Selamat datang, {{ user.name }}!</p>
        <p><strong>Explore new campaigns:</strong></p>
      </div>
      <div v-else>
        <p>Silakan <router-link to="/login">Login</router-link> atau 
        <router-link to="/signup">Sign Up</router-link> untuk mulai mengeksplorasi.</p>
      </div>
  
      <div v-for="campaign in campaigns" :key="campaign.id" class="campaign">
        <h3>{{ campaign.name }}</h3>
        <p>{{ campaign.short_description }}</p>
        <p><strong>Goal: ${{ campaign.goal_amount }}</strong></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        campaigns: [],  // Data kampanye dari backend
        isLoggedIn: false,
        user: {}
      };
    },
    
    async created() {
      await this.fetchCampaigns();
  
      // Mengecek apakah pengguna sudah login
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const userData = await fetch('/api/v1/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const userJSON = await userData.json();
          if (userJSON.name) {
            this.isLoggedIn = true;
            this.user = userJSON;
          }
        } catch (e) {
          console.error('User not authenticated');
        }
      }
    },
  
    methods: {
      async fetchCampaigns() {
        try {
          const res = await fetch('/api/v1/campaigns');
          const result = await res.json();
          this.campaigns = result;
        } catch (err) {
          console.error('Campaign fetching error', err);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .campaign {
    padding: 20px;
    border: 1px solid #ddd;
    margin-bottom: 15px;
    background: #f9f9f9;
  }
  
  h3 {
    font-weight: bold;
  }
  p {
    font-size: 16px;
    margin: 5px 0;
  }
  </style>
  