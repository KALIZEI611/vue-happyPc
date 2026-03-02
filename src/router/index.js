import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import CategoryPage from "../components/CategoryPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/category/:id",
    name: "Category",
    component: CategoryPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
