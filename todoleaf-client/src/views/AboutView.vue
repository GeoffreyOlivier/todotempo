<template>
  <div>
    <input v-model="email" type="email" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <button @click="handleLogin">Login</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { login } from '../auth';
import apiClient from '../auth'
const email = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  return apiClient.post('/login', { email, password });
  // try {
  //   const response = await login(email.value, password.value);
  //   console.log('Login successful:', response.data);
  //   // Redirigez l'utilisateur ou stockez l'état de connexion
  //   error.value = '';
  // } catch (err) {
  //   error.value = err.response.data.error || 'Failed to login';
  // }
};
</script>
