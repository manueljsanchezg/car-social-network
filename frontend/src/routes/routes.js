import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import RegisterForm from '../views/RegisterForm.vue';
import LoginForm from '../views/LoginForm.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/register', component: RegisterForm },
    { path: '/login', component: LoginForm }
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes
})