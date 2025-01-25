<template>
    <v-app-bar>
      <v-container class="nav-links-container">
          <v-btn variant="text" to="/" class="router-link">Home</v-btn>
          <v-btn variant="text" to="/login" class="router-link">Login</v-btn>
          <v-btn variant="text" to="/register" class="router-link">Register</v-btn>
      </v-container>
    </v-app-bar>
  </template>

<script setup>

</script>

<style scoped>

.nav-links-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

</style>