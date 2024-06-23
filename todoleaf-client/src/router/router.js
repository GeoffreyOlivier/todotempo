import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import HomeView from '@/views/HomeView.vue';
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: HomeView, meta: { requiresAuth: true } },
    { path: '/about', component: AboutView, meta: { requiresAuth: true } },
    { path: '/login', component: LoginView, meta: { requiresAuth: false } }
  ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.jwt) {
    return next('/login');
  }
  next();
});
