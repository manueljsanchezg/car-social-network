<template>
    <div class="create-car-wrapper">
        <v-form class="create-car-form" @submit.prevent="handleCreateCar">
            <h2 class="title">Create car</h2>
            <v-text-field class="input-text" v-model="carData.brand" label="Brand" required></v-text-field>
            <v-text-field class="input-text" v-model="carData.model" label="Model" required></v-text-field>
            <v-text-field type="number" class="input-text" v-model="carData.cv" label="Cv" required></v-text-field>
            <v-text-field type="number" class="input-text" v-model="carData.year" label="Year" required></v-text-field>
            <p>{{ carData.model }}</p>
            <p>{{ carData.brand }}</p>
            <p>{{ carData.cv }}</p>
            <p>{{ carData.year }}</p>
            <v-btn class="create-car" type="submit">Create</v-btn>
        </v-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { z } from 'zod';
import { router } from '../routes/routes';
import { useRouter } from 'vue-router';
import { createCar } from '../services/carService';

const carData = ref({ model: "", brand: "", cv: "", year: "" });

const errorValidation = ref({ modelError: "", brandError: "", cvError: "", yearError: "" });

const carDataSchema = z.object({
    model: z.string().min(1, { message: "Model is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    cv: z.number().min(1, { message: "Cv is required" }),
    year: z.number().min(1940, { message: "Year is required" }),
});

const handleCreateCar = async () => {
    try {
        const carToValidate = {
            ...carData.value,
            cv: parseInt(carData.value.cv),
            year: parseInt(carData.value.year)
        }
        carDataSchema.parse(carToValidate);
        const response = await createCar(carData.value);
        if (response.success) {
            console.log(response);
            router.push("/");
        } else {
            console.error(response.message);
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
                if (e.field === "model") {
                    errorValidation.value.modelError = e.message;
                } else if (e.field === "brand") {
                    errorValidation.value.brandError = e.message;
                } else if (e.field === "cv") {
                    errorValidation.value.cvError = e.message;
                } else if (e.field === "year") {
                    errorValidation.value.yearError = e.message;
                }
            });
        } else {
            console.error(error);
        }
    }
};
</script>

<style scoped>
.create-car-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: #e3e1e1;
}

.create-car-form {
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

.input-text {
    width: 100%;
}

.create-car {
    width: 100%;
    font-size: 1rem;
}

.create-car:hover {
    background: #f0eaea;
}

.error {
    color: red;
}
</style>