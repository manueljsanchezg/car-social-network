<template>
  <v-app-bar>
    <v-container class="nav-links-container">
      <v-btn v-if="isAuthenticated" variant="text" to="/" class="router-link">Home</v-btn>
      <v-btn v-if="!isAuthenticated" variant="text" to="/login" class="router-link">Login</v-btn>
      <v-btn v-if="isAuthenticated" variant="text" to="/user-profile" class="router-link">My Profile</v-btn>
      <v-btn @click="handleLogout" v-if="isAuthenticated" variant="text" class="router-link">Logout</v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup>

import { ref, watch } from 'vue';
import { emailStorage, jwtStorage } from '../storage/userStorage';

const isAuthenticated = ref(!!jwtStorage.value);

watch(jwtStorage, (newValue) => {
  isAuthenticated.value = !!newValue;
})

const handleLogout = () => {
  emailStorage.value = "";
  jwtStorage.value = "";
}

</script>

<style scoped>
.nav-links-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
</style>