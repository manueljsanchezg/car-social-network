<template>
    <div class="login-wrapper">
        <v-form class="login-container" @submit.prevent="handleLogin">
            <h2 class="title">Login</h2>
            <v-text-field class="input-text" v-model="userData.email" label="Email" clearable></v-text-field>
            <v-text-field class="input-password" type="password" v-model="userData.password" label="Password"
                clearable></v-text-field>
            <v-btn variant="plain" to="/register">Dont't have account?</v-btn>
            <p class="error" v-if="errorValidation.emailError">{{ errorValidation.emailError }}</p>
            <p class="error" v-if="errorValidation.passwordError">{{  errorValidation.passwordError }}</p>
            <p class="error" v-if="errorValidation.message">{{  errorValidation.message }}</p>
            <v-btn class="login-button" type="submit">Login</v-btn>
        </v-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { z } from 'zod';
import { loginUser } from '../services/userService';
import { emailStorage, jwtStorage } from '../storage/userStorage';
import { router } from '../routes/routes';

const userData = ref({ email: "", password: "" });

const errorValidation = ref({ emailError: "", passwordError: "", message: "" });

const userDataSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
});

const handleLogin = async () => {
    try {
        errorValidation.value.emailError = "";
        errorValidation.value.passwordError = "";
        errorValidation.value.message = "";
        userDataSchema.parse(userData.value);
        const response = await loginUser(userData.value);
        if (response.success) {
            console.log(response.token);
            emailStorage.value = response.email;
            jwtStorage.value = response.token;
            router.push("/");
        } else {
            errorValidation.value.message = response.message;
            console.error(response.message || "error");
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fieldErrors = error.errors.map((e) => {
                return {
                    field: e.path[0],
                    message: e.message,
                };
            });
            console.log(fieldErrors);
            fieldErrors.forEach((e) => {
                if (e.field === "email") {
                    errorValidation.value.emailError = e.message;
                } else if (e.field === "password") {
                    errorValidation.value.passwordError = e.message;
                }
            });
        } else {
            console.error(error);
        }
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

.error {
    color: red;
}
</style>