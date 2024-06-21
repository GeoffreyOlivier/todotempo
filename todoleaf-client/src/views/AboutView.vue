<template>
  <div>
    <button @click="handleLogin">Login</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { login } from '../auth';
import apiClient from '../auth'
const error = ref('');


const data = {
  email: 'jhon@doe.com2',
  password: 'adminleaf'
};

const handleLogin = () => {
  apiClient.post('/login', data)
      .then(response => {
        console.log(response.data);
      })
      .catch (response => {
        console.log(response.data);
      });
}


</script>
