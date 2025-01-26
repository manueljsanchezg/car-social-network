<template>
    <v-container class="profile-container">
        <h1>{{ email }}</h1>
    </v-container>
</template>

<script setup>
import { emailStorage } from '../storage/userStorage';

const email = emailStorage.value;
console.log(email);
</script>

<style>
.profile-container {
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>