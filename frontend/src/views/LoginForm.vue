<template>
    <div class="login-wrapper">
        <v-form class="login-container" @submit.prevent="handleLogin">
            <h2 class="title" >Login</h2>
            <v-text-field class="input-text" v-model="userData.email" label="Email" clearable></v-text-field>
            <v-text-field class="input-password" type="password" v-model="userData.password" label="Password"clearable></v-text-field>
            <v-btn variant="plain" to="/register">Dont't have account?</v-btn>
            <p>{{ userData.email }}</p>
            <p>{{ userData.password }}</p>
            <v-btn class="login-button" type="submit">Login</v-btn>
        </v-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { loginUser } from '../services/userService';
import { emailStorage, jwtStorage } from '../storage/userStorage';
import { router } from '../routes/routes';

const userData = ref({ email: "", password: "" });

const handleLogin = async () => {
    try {
        const response = await loginUser(userData.value);
        console.log(response.token);
        emailStorage.value = response.email;
        jwtStorage.value = response.token;
        router.push("/");
    } catch (error) {
        console.error(error);
    }
};
</script>

<style scoped>
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: #e3e1e1;
}

.login-container {
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

.login-button {
    width: 100%;
    font-size: 1rem;
}

.login-button:hover {
    background: #f0eaea;
}
</style>