<template>
  <div class="category-page">
    <div class="container">
      <div v-if="category" class="category-header">
        <div class="category-icon-large">
          <img :src="category.icon" :alt="category.name" />
        </div>
        <div class="category-info">
          <h1>{{ category.name }}</h1>
          <p class="category-count">{{ category.products.length }} товаров</p>
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Загрузка товаров...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <i class="fas fa-exclamation-circle"></i>
        <p>{{ error }}</p>
        <button @click="fetchCategoryData" class="retry-btn">
          <i class="fas fa-redo"></i> Повторить
        </button>
      </div>

      <div v-else-if="category" class="products-section">
        <div class="products-header">
          <div class="results-info">
            Показано {{ category.products.length }} товаров
          </div>
          <div class="sort-selector">
            <label for="sort">Сортировка:</label>
            <select id="sort" v-model="sortBy">
              <option value="default">По умолчанию</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
              <option value="rating">По рейтингу</option>
              <option value="name">По названию</option>
            </select>
          </div>
        </div>

        <div v-if="sortedProducts.length === 0" class="no-products">
          <i class="fas fa-box-open"></i>
          <p>В этой категории пока нет товаров</p>
        </div>

        <div v-else class="products-grid">
          <ProductCard
            v-for="product in sortedProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="$emit('add-to-cart', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import ProductCard from "./ProductCard.vue";

const route = useRoute();

const loading = ref(true);
const error = ref(null);
const category = ref(null);
const sortBy = ref("default");

const categoryMapping = {
  1: {
    url: "Processors",
    name: "Процессоры",
    icon: "https://cdn-icons-png.flaticon.com/512/4738/4738920.png",
  },
  2: {
    url: "Video_cards",
    name: "Видеокарты",
    icon: "https://cdn-icons-png.flaticon.com/512/3849/3849880.png",
  },
  3: {
    url: "RAM",
    name: "Оперативная память",
    icon: "https://cdn-icons-png.flaticon.com/512/900/900330.png",
  },
  4: {
    url: "SSD",
    name: "SSD накопители",
    icon: "https://cdn-icons-png.flaticon.com/512/2286/2286814.png",
  },
  5: {
    url: "Motherboards",
    name: "Материнские платы",
    icon: "https://cdn-icons-png.flaticon.com/512/2124/2124065.png",
  },
  6: {
    url: "Power_supplies",
    name: "Блоки питания",
    icon: "https://cdn-icons-png.flaticon.com/512/2507/2507398.png",
  },
  7: {
    url: "Buildings",
    name: "Корпусы",
    icon: "https://cdn-icons-png.flaticon.com/512/6329/6329098.png",
  },
  8: {
    url: "Monitors",
    name: "Мониторы",
    icon: "https://cdn-icons-png.flaticon.com/512/3474/3474360.png",
  },
  9: {
    url: "Coolers",
    name: "Кулеры",
    icon: "https://cdn-icons-png.flaticon.com/512/2729/2729134.png",
  },
  10: {
    url: "Keyboards",
    name: "Клавиатуры",
    icon: "https://cdn-icons-png.flaticon.com/512/689/689392.png",
  },
  11: {
    url: "Mice",
    name: "Мышки",
    icon: "https://cdn-icons-png.flaticon.com/512/10534/10534765.png",
  },
  12: {
    url: "Headphones",
    name: "Наушники",
    icon: "https://cdn-icons-png.flaticon.com/512/2353/2353224.png",
  },
};

const fetchCategoryData = async () => {
  loading.value = true;
  error.value = null;

  const categoryId = parseInt(route.params.id);
  const categoryInfo = categoryMapping[categoryId];

  if (!categoryInfo) {
    error.value = "Категория не найдена";
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(
      `https://b264ce7a51299334.mokky.dev/${categoryInfo.url}`,
    );

    category.value = {
      id: categoryId,
      name: categoryInfo.name,
      icon: categoryInfo.icon,
      products: response.data.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        rating: item.rating || 4.5,
      })),
    };
  } catch (err) {
    console.error(`Ошибка загрузки категории:`, err);
    error.value = "Не удалось загрузить товары. Пожалуйста, попробуйте позже.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCategoryData();
});

const sortedProducts = computed(() => {
  if (!category.value) return [];

  const products = [...category.value.products];

  switch (sortBy.value) {
    case "price-asc":
      return products.sort((a, b) => a.price - b.price);
    case "price-desc":
      return products.sort((a, b) => b.price - a.price);
    case "rating":
      return products.sort((a, b) => b.rating - a.rating);
    case "name":
      return products.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return products;
  }
});
</script>

<style scoped>
.category-page {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.container {
  padding-top: 20px;
}

.category-header,
.loading-state,
.error-state {
  margin-top: 20px;
}

.separator {
  margin: 0 10px;
  color: #999;
}

.current {
  color: #333;
  font-weight: 500;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 30px;
  background: white;
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
}

.category-icon-large {
  width: 120px;
  height: 120px;
  background-color: #4a90e2;
  border-radius: 30px;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-icon-large img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.category-info h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.category-count {
  color: #666;
  font-size: 1.1rem;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4a90e2;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-state i {
  font-size: 3rem;
  color: #e74c3c;
  margin-bottom: 20px;
}

.error-state p {
  color: #666;
  margin-bottom: 20px;
}

.retry-btn {
  padding: 12px 30px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.retry-btn:hover {
  background-color: #357abd;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(74, 144, 226, 0.3);
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.results-info {
  color: #666;
  font-size: 1rem;
}

.sort-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-selector label {
  color: #666;
  font-size: 0.95rem;
}

.sort-selector select {
  padding: 8px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
}

.sort-selector select:hover,
.sort-selector select:focus {
  border-color: #4a90e2;
  outline: none;
}

.no-products {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.no-products i {
  font-size: 4rem;
  color: #999;
  margin-bottom: 20px;
}

.no-products p {
  color: #666;
  font-size: 1.1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
}

@media (max-width: 768px) {
  .container {
    padding-top: 20px;
  }

  .category-header {
    flex-direction: column;
    text-align: center;
    padding: 30px;
  }

  .category-info h1 {
    font-size: 2rem;
  }

  .products-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .sort-selector {
    width: 100%;
  }

  .sort-selector select {
    flex: 1;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .container {
    padding-top: 15px;
  }

  .category-icon-large {
    width: 100px;
    height: 100px;
    padding: 20px;
  }

  .category-info h1 {
    font-size: 1.5rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }
}
</style>
