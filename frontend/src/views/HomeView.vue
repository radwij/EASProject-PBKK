<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <!-- Home Section -->
    <div class="container mt-4">
      <Home />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Home from "@/components/Home.vue";

export default {
  components: {
    Navbar,
    Home,
  },
};
</script>

<style scoped>
/* Menghapus margin dan padding default */
body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

/* Mengatur .container agar full width tanpa border */
.container {
  width: 100%;
  padding: 0;
  max-width: 100%;
  box-sizing: border-box;
  border: none;
  margin: 0 auto;
}

/* Menghapus border yang mungkin ada di elemen */
div, button, input, textarea {
  border: none !important;
  outline: none !important;
}

/* Menghapus box-shadow dan border di semua elemen */
* {
  box-shadow: none !important;
}
</style>
