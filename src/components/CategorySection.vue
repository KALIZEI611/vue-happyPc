<template>
  <div class="category-section">
    <div class="category-header">
      <i :class="category.icon"></i>
      <h3>{{ category.name }}</h3>
    </div>

    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="$emit('add-to-cart', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import ProductCard from "./ProductCard.vue";

// Props
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
});

// Emits
defineEmits(["add-to-cart"]);
</script>

<style scoped>
.category-section {
  margin-bottom: 60px;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 15px;
}

.category-header i {
  font-size: 2rem;
  color: #3498db;
}

.category-header h3 {
  font-size: 1.8rem;
  margin: 0;
  color: #333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 25px;
}

@media (max-width: 768px) {
  .category-section {
    padding: 20px;
  }

  .category-header h3 {
    font-size: 1.5rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }
}
</style>
