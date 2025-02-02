<template>
    <div class="car-list-container">
        <h2 class="title">{{ props.title }}</h2>
        <p class="loading" v-if="isLoading">Cargando...</p>
        <ul class="car-list" v-if="!isLoading">
            <li v-for="car in cars" :key="car.id" >
                <CarCard :car="car" />
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllNoUsersCars } from '../services/carService';
import CarCard from './CarCard.vue';

const props = defineProps({
    title: {
        type: String
    },
    type: {
        type: String,
        default: "all"
    }
})

const cars = ref([]);
const isLoading = ref(true)

onMounted(async () => {
    try {
        const data = await getAllNoUsersCars(props.type);
        cars.value = data.cars;
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false;
    }
})

</script>

<style scoped>
.car-list-container {
    min-height: calc(100vh - 64px);
    padding-top: 64px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
}

.car-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    list-style-type: none;
}

</style>