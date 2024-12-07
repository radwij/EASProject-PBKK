<template>
    <div class="signup-container">
      <div class="signup-form">
        <h2>Sign Up</h2>
  
        <input v-model="name" type="text" placeholder="Full Name" />
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="occupation" type="text" placeholder="Occupation" />
  
        <button @click="registerUser" class="btn">Sign Up</button>
  
        <p>Already have an account? 
          <span @click="$router.push('/login')" class="login-link">Login</span>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
        occupation: ""
      };
    },
    methods: {
      async registerUser() {
        try {
          // Mengirim data signup ke backend
          const response = await axios.post("http://localhost:8080/api/v1/users", {
            name: this.name,
            email: this.email,
            password: this.password,
            occupation: this.occupation
          });
  
          alert("Signup successful! Please login.");
          this.$router.push('/login');
          
        } catch (error) {
          console.error("Signup error:", error.response?.data);
  
          // Menampilkan pesan error dari backend
          const errorMsg = error.response?.data?.message || "Signup failed. Please check your information.";
          alert(`Signup Failed: ${errorMsg}`);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  .signup-form {
    width: 350px;
    padding: 30px;
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    text-align: center;
    font-family: Arial, sans-serif;
  }
  
  h2 {
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  input {
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  input:focus {
    outline: none;
    border-color: #90caf9;
  }
  
  .btn {
    width: 100%;
    padding: 15px;
    background-color: #1976d2;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .btn:hover {
    background-color: #1565c0;
  }
  
  .login-link {
    color: #1976d2;
    font-weight: bold;
    cursor: pointer;
  }
  
  .login-link:hover {
    text-decoration: underline;
  }
  </style>
  