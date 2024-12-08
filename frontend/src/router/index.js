import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import HomeView from "@/views/HomeView.vue";
import 'mdb-vue-ui-kit/css/mdb.min.css';

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/signup", component: SignupView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
