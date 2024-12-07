<template>
    <div class="login-container">
      <div class="login-form">
        <h2>Login</h2>
  
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="loginUser" class="btn">Login</button>
  
        <p>Don't have an account? 
          <span @click="$router.push('/signup')" class="signup-link">Sign Up</span>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        email: "",
        password: ""
      };
    },
    methods: {
      async loginUser() {
        try {
          // Mengirim request login ke backend
          const response = await axios.post("http://localhost:8080/api/v1/sessions", {
            email: this.email,
            password: this.password
          });
  
          // Menyimpan token yang diterima dari backend ke localStorage
          localStorage.setItem("token", response.data.access_token);
          alert("Login successful!");
  
          // Mengarahkan ke halaman utama setelah login sukses
          this.$router.push("/");
        } catch (error) {
          console.error("Login error:", error.response?.data);
  
          // Menampilkan pesan error dari backend jika login gagal
          const errorMsg = error.response?.data?.message || "Invalid email or password.";
          alert(`Login Failed: ${errorMsg}`);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f4f8;
  }
  
  .login-form {
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
  
  .signup-link {
    color: #1976d2;
    font-weight: bold;
    cursor: pointer;
  }
  
  .signup-link:hover {
    text-decoration: underline;
  }
  </style>
  