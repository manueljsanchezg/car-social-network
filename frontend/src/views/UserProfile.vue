<template>
    <v-container class="profile-container">
        <h1>{{ email }}</h1>
        <CarList title="My Cars" type="user"/>
        <v-btn class="create-car-button" to="/create-car" >Create Car</v-btn>
    </v-container>
</template>

<script setup>
import CarList from '../components/CarList.vue';
import { emailStorage } from '../storage/userStorage';

const email = emailStorage.value;
</script>

<style>
.profile-container {
  min-height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

h1 {
  padding-top: 64px;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.create-car-button {
  margin: 2rem 0 2rem 0;
}
</style>