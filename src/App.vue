<template>
  <div class="app">
    <Navbar
      :cart-count="cart.length"
      @search="handleSearch"
      @toggle-cart="toggleCart"
    />

    <main class="main-content">
      <!-- Hero секция -->
      <section class="hero">
        <div class="container">
          <h1>Комплектующие для вашего ПК</h1>
          <p>Широкий выбор запчастей по доступным ценам</p>
        </div>
      </section>

      <!-- Категории товаров -->
      <section class="categories">
        <div class="container">
          <h2 class="section-title">Категории</h2>
          <CategorySection
            v-for="category in filteredCategories"
            :key="category.id"
            :category="category"
            :products="category.products"
            @add-to-cart="addToCart"
          />
        </div>
      </section>
    </main>

    <!-- Корзина -->
    <div v-if="showCart" class="cart-modal">
      <div class="cart-content">
        <h3>Корзина</h3>
        <div v-if="cart.length === 0" class="empty-cart">Корзина пуста</div>
        <div v-else>
          <div v-for="(item, index) in cart" :key="index" class="cart-item">
            <span>{{ item.name }}</span>
            <span>{{ item.price }} ₽</span>
            <button @click="removeFromCart(index)" class="remove-btn">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div class="cart-total">
            <strong>Итого: {{ cartTotal }} ₽</strong>
          </div>
          <button class="checkout-btn">Оформить заказ</button>
        </div>
        <button @click="showCart = false" class="close-cart">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Navbar from "./components/Navbar.vue";
import CategorySection from "./components/CategorySection.vue";

// Состояние
const searchQuery = ref("");
const showCart = ref(false);
const cart = ref([]);

// Данные категорий с реальными изображениями
const categories = ref([
  {
    id: 1,
    name: "Процессоры",
    icon: "fas fa-microchip",
    products: [
      {
        id: 101,
        name: "Intel Core i5-13400F",
        price: 18990,
        image:
          "https://c.dns-shop.ru/thumb/st1/fit/320/250/f94ce6e7002f7f7362687e183ae4f0a0/b5e42fd9b7c42f800fd1f9808a8c524efd1b7c81b15f01d6ed3ef39625b136fb.jpg",
        rating: 4.8,
      },
      {
        id: 102,
        name: "AMD Ryzen 5 7600X",
        price: 21500,
        image:
          "https://c.dns-shop.ru/thumb/st1/fit/320/250/afbb57abe5d74e62c945fda8a38017b0/78bcf2918fdf2d1d3e02dde1e9007e03ed747f82bd81c8a595845edcdbf2582d.jpg",
        rating: 4.9,
      },
      {
        id: 103,
        name: "Intel Core i7-13700K",
        price: 32990,
        image:
          "https://c.dns-shop.ru/thumb/st4/fit/320/250/e04c57f7734afd87b7b9ff0e48a78700/d4c5ac285e704d29542c41df4dd58bfdbea2e26bf597cce45714c6285b2985f4.jpg",
        rating: 4.7,
      },
      {
        id: 103,
        name: "Intel Core i5-14600KF",
        price: 32990,
        image:
          "https://c.dns-shop.ru/thumb/st4/fit/320/250/04edd4762954962519c6ac68e6348325/4037d46c89ca05f8c1a0d40564cc322949ee5732e4715b0b6dff8f9cd91989c6.jpg",
        rating: 4.7,
      },
    ],
  },
  {
    id: 2,
    name: "Видеокарты",
    icon: "fas fa-tv",
    products: [
      {
        id: 201,
        name: "NVIDIA RTX 4060 Ti",
        price: 38990,
        image:
          "https://c.dns-shop.ru/thumb/st1/fit/300/300/4b1c85f05ce41d639f7a8103b88cba2b/7cd311b02c0f489110aeb38af86cdaa375822c2f52bdb0d6286772c44ab1f526.jpg",
        rating: 4.6,
      },
      {
        id: 202,
        name: "AMD Radeon RX 7800 XT",
        price: 45990,
        image:
          "https://c.dns-shop.ru/thumb/st1/fit/300/300/7e6c5372d3f3bdf7c0b3b8d6b8d9d6a0/4b3b8d6b8d9d6a0c0b3b8d6b8d9d6a0c.jpg",
        rating: 4.8,
      },
      {
        id: 203,
        name: "NVIDIA RTX 4070",
        price: 58990,
        image:
          "https://c.dns-shop.ru/thumb/st1/fit/300/300/8d9d6a0c0b3b8d6b8d9d6a0c0b3b8d6b/7e6c5372d3f3bdf7c0b3b8d6b8d9d6a0.jpg",
        rating: 4.9,
      },
    ],
  },
  {
    id: 3,
    name: "Оперативная память",
    icon: "fas fa-memory",
    products: [
      {
        id: 301,
        name: "Kingston Fury 16GB DDR4",
        price: 4990,
        image:
          "https://c.dns-shop.ru/thumb/st1/fit/300/300/6a1b8d6b8d9d6a0c0b3b8d6b8d9d6a0c/4b3b8d6b8d9d6a0c0b3b8d6b8d9d6a0c.jpg",
        rating: 4.5,
      },
      {
        id: 302,
        name: "Corsair Vengeance 32GB DDR5",
        price: 9990,
        image:
          "https://c.dns-shop.ru/thumb/st1/fit/300/300/7e6c5372d3f3bdf7c0b3b8d6b8d9d6a0/4b3b8d6b8d9d6a0c0b3b8d6b8d9d6a0c.jpg",
        rating: 4.7,
      },
      {
        id: 303,
        name: "G.Skill Trident Z 64GB",
        price: 18990,
        image:
          "https://c.dns-shop.ru/thumb/st1/fit/300/300/8d9d6a0c0b3b8d6b8d9d6a0c0b3b8d6b/7e6c5372d3f3bdf7c0b3b8d6b8d9d6a0.jpg",
        rating: 4.8,
      },
    ],
  },
  {
    id: 4,
    name: "Накопители",
    icon: "fas fa-hdd",
    products: [
      {
        id: 401,
        name: "Samsung 980 Pro 1TB",
        price: 7990,
        image:
          "https://c.dns-shop.ru/thumb/st1/fit/300/300/4b1c85f05ce41d639f7a8103b88cba2b/7cd311b02c0f489110aeb38af86cdaa375822c2f52bdb0d6286772c44ab1f526.jpg",
        rating: 4.9,
      },
      {
        id: 402,
        name: "WD Black SN850X 2TB",
        price: 12990,
        image:
          "https://c.dns-shop.ru/thumb/st1/fit/300/300/7e6c5372d3f3bdf7c0b3b8d6b8d9d6a0/4b3b8d6b8d9d6a0c0b3b8d6b8d9d6a0c.jpg",
        rating: 4.8,
      },
      {
        id: 403,
        name: "Kingston KC3000 4TB",
        price: 23990,
        image:
          "https://c.dns-shop.ru/thumb/st1/fit/300/300/8d9d6a0c0b3b8d6b8d9d6a0c0b3b8d6b/7e6c5372d3f3bdf7c0b3b8d6b8d9d6a0.jpg",
        rating: 4.7,
      },
    ],
  },
]);

// Вычисляемые свойства
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value;

  const query = searchQuery.value.toLowerCase();
  return categories.value
    .map((category) => ({
      ...category,
      products: category.products.filter((product) =>
        product.name.toLowerCase().includes(query),
      ),
    }))
    .filter((category) => category.products.length > 0);
});

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + item.price, 0);
});

// Методы
const handleSearch = (query) => {
  searchQuery.value = query;
};

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
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.main-content {
  padding-top: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  background-color: #2c3e50;
  color: white;
  padding: 80px 0;
  text-align: center;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.section-title {
  color: #333;
  font-size: 2rem;
  margin-bottom: 40px;
  text-align: center;
}

.cart-modal {
  position: fixed;
  top: 80px;
  right: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 350px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  border: 1px solid #e0e0e0;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.cart-content {
  padding: 20px;
}

.cart-content h3 {
  margin-bottom: 15px;
  color: #333;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.empty-cart {
  text-align: center;
  color: #999;
  padding: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.cart-item span:first-child {
  flex: 1;
  margin-right: 10px;
}

.remove-btn {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 5px;
}

.remove-btn:hover {
  color: #c0392b;
}

.cart-total {
  margin: 15px 0;
  text-align: right;
  font-size: 1.1rem;
  border-top: 2px solid #eee;
  padding-top: 10px;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkout-btn:hover {
  background-color: #2980b9;
}

.close-cart {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  cursor: pointer;
  color: #495057;
}

.close-cart:hover {
  background-color: #e9ecef;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .cart-modal {
    width: 300px;
    right: 10px;
  }
}
</style>
