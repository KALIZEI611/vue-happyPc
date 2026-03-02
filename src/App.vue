<template>
  <div class="app">
    <Navbar
      :cart-count="cart.length"
      @search="handleSearch"
      @toggle-cart="toggleCart"
    />

    <main class="main-content">
      <router-view
        :cart="cart"
        :show-cart="showCart"
        @add-to-cart="addToCart"
        @toggle-cart="toggleCart"
        @search="handleSearch"
      />
    </main>

    <CartModal
      :show="showCart"
      :cart="cart"
      :cart-total="cartTotal"
      @close="showCart = false"
      @remove-from-cart="removeFromCart"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Navbar from "./components/Navbar.vue";
import CartModal from "./components/CartModal.vue";

const router = useRouter();
const showCart = ref(false);
const cart = ref([]);
const searchQuery = ref("");

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + item.price, 0);
});

const toggleCart = () => {
  showCart.value = !showCart.value;
};

const addToCart = (product) => {
  cart.value.push(product);
  showCart.value = true;
};

const removeFromCart = (index) => {
  cart.value.splice(index, 1);
};

const handleSearch = (query) => {
  searchQuery.value = query;
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.main-content {
  padding-top: 80px;
  padding-bottom: 60px;
}
</style>
