<template>
    <div class="register-wrapper">
        <v-form class="register-container" @submit.prevent="handleRegister">
            <h2 class="title" >Register</h2>
            <v-text-field class="input-text" v-model="userData.email" label="Email" clearable></v-text-field>
            <v-text-field class="input-password" type="password" v-model="userData.password" label="Password"
                clearable></v-text-field>
            <p>{{ userData.email }}</p>
            <p>{{ userData.password }}</p>
            <v-btn class="register-button" type="submit">Register</v-btn>
        </v-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { registerUser } from '../services/userService';

const userData = ref({ email: "", password: "" });

const handleRegister = async () => {
    try {
        const response = await registerUser(userData.value);
        console.log(response.message);
    } catch (error) {
        console.error(error);
    }
};
</script>

<style scoped>
.register-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: #e3e1e1;
}

.register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    background: #ffffff;
    border-radius: 1rem;
    max-width: 400px;
    width: 100%;
}

.title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
}

.input-text, 
.input-password {
    width: 100%;
}

.register-button {
    width: 100%;
    font-size: 1rem;
}

.register-button:hover {
    background: #f0eaea;
}
</style>