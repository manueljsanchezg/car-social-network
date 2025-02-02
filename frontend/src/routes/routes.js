import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterForm from "../views/RegisterForm.vue";
import LoginForm from "../views/LoginForm.vue";
import UserProfile from "../views/UserProfile.vue";
import CreateCar from "../views/CreateCar.vue"
import { validateToken } from "../services/authService";

const routes = [
  { path: "/", component: HomeView },
  { path: "/register", component: RegisterForm },
  { path: "/login", component: LoginForm },
  { path: "/user-profile", component: UserProfile },
  { path: "/create-car", component: CreateCar },
];

const publicRoutes = ["register", "login"];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await validateToken().catch(() => false);
  const goToPublicRoute = publicRoutes.includes(to.path.slice(1));

  if (!isAuthenticated && goToPublicRoute) {
    return next();
  }

  if (!isAuthenticated && !goToPublicRoute) {
    return next({ path: "login" });
  }

  next();
});
