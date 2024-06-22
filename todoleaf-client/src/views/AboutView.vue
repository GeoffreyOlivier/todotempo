<template>
  <div class="login-form">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.store.js';
const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    alert('Login successful!');
    // Rediriger vers la page d'accueil ou le tableau de bord ici
  } catch (error) {
    alert('Failed to login!');
  }
};
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form input[type="email"],
.login-form input[type="password"] {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
