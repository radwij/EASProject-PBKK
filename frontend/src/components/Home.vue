<template>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text-container">
          <h1 class="hero-title">Crowdfunding PBKK</h1>
          <p class="hero-subtitle">Mendukung Inovasi, Memberdayakan Kreativitas</p>
          <button @click="createNewProject" class="create-project-btn">
            Create Project
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section ref="projectsSection" class="projects-section">
      <div class="section-header">
        <h2>Ongoing Projects</h2>
        <p>Explore and support amazing initiatives</p>
      </div>

      <div class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <img :src="project.coverImage" :alt="project.title" class="project-image">
          <div class="project-details">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-progress">
              <div 
                class="progress-bar"
                :style="{ width: `${calculateProgressPercentage(project)}%` }"
              ></div>
              <div class="progress-info">
                <span>{{ calculateProgressPercentage(project) }}%</span>
                <span>Rp {{ formatCurrency(project.currentAmount) }} / Rp {{ formatCurrency(project.goalAmount) }}</span>
              </div>
            </div>
            <div class="project-actions">
              <button @click="viewProjectDetails(project.id)">View Details</button>
              <button @click="supportProject(project.id)">Support Project</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Infinite Scroll Trigger -->
      <div 
        v-if="hasMoreProjects && !isLoading"
        ref="scrollTrigger"
        class="scroll-trigger"
      >
        Loading more projects...
      </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
  name: "LandingPage",
  data() {
    return {
      projects: [],
      page: 1,
      hasMoreProjects: true,
      isLoading: false,
      observer: null,
    };
  },
  mounted() {
    this.setupScrollObserver();
  },
  methods: {
    setupScrollObserver() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && this.hasMoreProjects && !this.isLoading) {
            this.fetchProjects();
          }
        });
      }, options);

      if (this.$refs.scrollTrigger) {
        this.observer.observe(this.$refs.scrollTrigger);
      }
    },
    async fetchProjects() {
      if (this.isLoading) return;

      this.isLoading = true;
      try {
        const response = await axios.get(`/api/projects?page=${this.page}`);

        if (response.data.projects.length === 0) {
          this.hasMoreProjects = false;
        } else {
          this.projects = [...this.projects, ...response.data.projects];
          this.page++;
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        this.isLoading = false;
      }
    },
    createNewProject() {
      this.$router.push("/projects/create");
    },
    viewProjectDetails(projectId) {
      this.$router.push(`/projects/${projectId}`);
    },
    supportProject(projectId) {
      this.$router.push(`/projects/${projectId}/support`);
    },
    calculateProgressPercentage(project) {
      return Math.round((project.currentAmount / project.goalAmount) * 100);
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat("id-ID").format(amount);
    },
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>

<style scoped>
/* General Styles */
.landing-container {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url("/api/placeholder/1920/1080") no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.hero-content {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  padding-left: 10%;
}

.hero-text-container {
  color: white;
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.create-project-btn {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-project-btn:hover {
  background-color: #0056b3;
}

/* Projects Section */
.projects-section {
  padding: 4rem 2rem;
  background-color: #f4f4f4;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
}

.project-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.project-details {
  padding: 1.5rem;
}

.project-actions button:first-child {
  background-color: #6c757d;
  color: white;
}

.project-actions button:last-child {
  background-color: #28a745;
  color: white;
}

/* Infinite Scroll */
.scroll-trigger {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>
