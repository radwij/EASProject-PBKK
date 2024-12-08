<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-left">
        <button @click="goToHome" class="nav-button">Home</button>
        <button @click="goToProducts" class="nav-button">Products</button>
        <input 
          v-model="searchQuery" 
          @keyup.enter="performSearch" 
          placeholder="Search..." 
          class="search-input"
        >
      </div>
      <div class="navbar-right">
        <template v-if="isLoggedIn">
          <span class="user-name">{{ userName }}</span>
          <button @click="logout" class="nav-button logout-button">Logout</button>
        </template>
        <template v-else>
          <button @click="goToLogin" class="nav-button login-button">Login</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Navbar',
  data() {
    return {
      isLoggedIn: false,
      userName: '',
      searchQuery: ''
    }
  },
  created() {
    this.checkAuthStatus();
  },
  methods: {
    async checkAuthStatus() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Validate token with backend
          const response = await axios.get('/api/validate-token', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.data.success) {
            this.isLoggedIn = true;
            this.userName = response.data.user.name;
          } else {
            this.logout();
          }
        } catch (error) {
          this.logout();
        }
      }
    },
    goToHome() {
      this.$router.push('/');
    },
    goToProducts() {
      this.$router.push('/products');
    },
    goToLogin() {
      this.$router.push('/login');
    },
    performSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push(`/search?query=${this.searchQuery}`);
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.userName = '';
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.navbar-left, .navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #0056b3;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.user-name {
  margin-right: 1rem;
  font-weight: bold;
}

.logout-button {
  background-color: #dc3545;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>