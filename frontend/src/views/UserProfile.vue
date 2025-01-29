<template>
    <v-container class="profile-container">
        <h1>{{ email }}</h1>
        <CarList title="My Cars" type="user"/>
    </v-container>
</template>

<script setup>
import CarList from '../components/CarList.vue';
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
  gap: 200px;
}
</style>