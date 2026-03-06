import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import CategoryPage from "../components/CategoryPage.vue";
import CartPage from "../components/CartPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/category/:id", name: "Category", component: CategoryPage },
  { path: "/cart", name: "Cart", component: CartPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;