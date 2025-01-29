<template>
    <div class="car-list-container">
        <h2 class="title">{{ props.title }}</h2>
        <p class="loading" v-if="isLoading">Cargando...</p>
        <ul class="car-list" v-if="!isLoading">
            <li v-for="car in cars" :key="car.id">
                {{ car.brand }} - {{ car.model }} - {{ car.cv }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllNoUsersCars } from '../services/carService';

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
        console.log(data);
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
    height: calc(100vh - 64px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.car-list {
    display: flex;
    flex-direction: column;
}
</style>