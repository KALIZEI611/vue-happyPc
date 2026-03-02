<template>
  <div class="product-card">
    <div class="product-image-container">
      <div class="product-image">
        <img :src="product.image" :alt="product.name" loading="lazy" />
        <div class="product-overlay">
          <button @click="$emit('add-to-cart', product)" class="quick-add">
            <i class="fas fa-cart-plus"></i> В корзину
          </button>
        </div>
      </div>
    </div>

    <div class="product-info">
      <h3 class="product-title">{{ product.name }}</h3>

      <div class="product-rating">
        <i
          v-for="star in 5"
          :key="star"
          class="fas fa-star"
          :class="{ filled: star <= Math.floor(product.rating) }"
        >
        </i>
        <span class="rating-value">{{ product.rating }}</span>
      </div>

      <div class="product-price">{{ product.price.toLocaleString() }} ₽</div>

      <button @click="$emit('add-to-cart', product)" class="add-to-cart">
        <i class="fas fa-cart-plus"></i> Добавить
      </button>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Emits
defineEmits(["add-to-cart"]);
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-top: 100%; /* Создает квадратный контейнер 1:1 */
  overflow: hidden;
  background-color: #f8f9fa;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Изображение полностью помещается в контейнер */
  object-position: center;
  transition: transform 0.5s;
  padding: 10px; /* Добавляем отступы, чтобы изображение не прилипало к краям */
  background-color: #f8f9fa;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 8px;
  margin: 10px;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.quick-add {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transform: translateY(20px);
  transition: transform 0.3s;
  font-weight: 500;
}

.product-card:hover .quick-add {
  transform: translateY(0);
}

.quick-add:hover {
  background-color: #2980b9;
}

.product-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-title {
  margin: 0;
  font-size: 1rem;
  color: #333;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.8em;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.fa-star {
  color: #ddd;
  font-size: 0.85rem;
}

.fa-star.filled {
  color: #f1c40f;
}

.rating-value {
  margin-left: 4px;
  color: #666;
  font-size: 0.85rem;
  font-weight: 500;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 4px 0;
}

.add-to-cart {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  margin-top: 4px;
}

.add-to-cart:hover {
  background-color: #2980b9;
}

.add-to-cart i {
  font-size: 1rem;
}

/* Адаптивность */
@media (max-width: 768px) {
  .product-image-container {
    padding-top: 100%; /* Оставляем квадратными и на мобильных */
  }

  .product-info {
    padding: 12px;
  }

  .product-title {
    font-size: 0.95rem;
  }

  .product-price {
    font-size: 1.1rem;
  }
}
</style>
