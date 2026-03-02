<template>
  <div v-if="show" class="cart-modal">
    <div class="cart-content">
      <h3>Корзина</h3>
      <div v-if="cart.length === 0" class="empty-cart">Корзина пуста</div>
      <div v-else>
        <div v-for="(item, index) in cart" :key="index" class="cart-item">
          <span>{{ item.name }}</span>
          <span>{{ item.price }} ₽</span>
          <button @click="$emit('remove-from-cart', index)" class="remove-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="cart-total">
          <strong>Итого: {{ cartTotal }} ₽</strong>
        </div>
        <button class="checkout-btn">Оформить заказ</button>
      </div>
      <button @click="$emit('close')" class="close-cart">Закрыть</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Array,
    required: true,
  },
  cartTotal: {
    type: Number,
    required: true,
  },
});

defineEmits(["close", "remove-from-cart"]);
</script>

<style scoped>
.cart-modal {
  position: fixed;
  top: 80px;
  right: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
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
  border-bottom: 2px solid #4a90e2;
  padding-bottom: 10px;
  font-size: 1.2rem;
}

.empty-cart {
  text-align: center;
  color: #999;
  padding: 20px;
  font-size: 1rem;
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
  color: #333;
  font-size: 0.95rem;
}

.remove-btn {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s;
  border-radius: 50%;
}

.remove-btn:hover {
  color: #c0392b;
  background: #fee;
}

.cart-total {
  margin: 15px 0;
  text-align: right;
  font-size: 1.1rem;
  border-top: 2px solid #eee;
  padding-top: 10px;
  color: #333;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  margin-bottom: 10px;
}

.checkout-btn:hover {
  background-color: #357abd;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(74, 144, 226, 0.3);
}

.close-cart {
  width: 100%;
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
  color: #495057;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.close-cart:hover {
  background-color: #e9ecef;
}

@media (max-width: 768px) {
  .cart-modal {
    width: 300px;
    right: 10px;
  }
}

@media (max-width: 480px) {
  .cart-modal {
    width: 280px;
  }
}
</style>
