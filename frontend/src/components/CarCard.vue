<template>
    <div class="car-card">
        <p>{{ props.car.user.email }}</p>
        <img src="https://img.freepik.com/premium-vector/car-full-size-body-icon-broken-line_1076610-24338.jpg" alt="car image">
        <p>Model: {{ props.car.model }}</p>
        <p>Brand: {{ props.car.brand }}</p>
        <p>{{ props.car.cv }} CV</p>
        <p>Year: {{ props.car.year }}</p>
    </div>
</template>

<script setup>

const props = defineProps({
    car: {
        type: Object
    }
})
</script>

<style scoped>
.car-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid black;
    border-radius: 1.5rem;
    width: 12rem;
    height: 18rem;
}

img {
    width: 100px;
    height: 100px;
}
</style>