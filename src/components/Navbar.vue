<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <i class="fas fa-microchip"></i>
        <span>PC Parts Store</span>
      </div>

      <div class="nav-search">
        <input
          type="text"
          v-model="localSearchQuery"
          placeholder="Поиск запчастей..."
          @input="handleSearch"
        />
        <i class="fas fa-search"></i>
      </div>

      <ul class="nav-menu">
        <li v-for="item in menuItems" :key="item.id">
          <a :href="item.link" @click.prevent="scrollToSection(item.section)">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>

      <div class="nav-cart" @click="$emit('toggle-cart')">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-badge" v-if="cartCount > 0">{{ cartCount }}</span>
      </div>

      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <i class="fas fa-bars"></i>
      </button>
    </div>

    <!-- Мобильное меню -->
    <div v-if="mobileMenuOpen" class="mobile-menu">
      <ul>
        <li v-for="item in menuItems" :key="item.id">
          <a :href="item.link" @click.prevent="scrollToSection(item.section)">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

// Props
const props = defineProps({
  cartCount: {
    type: Number,
    default: 0,
  },
});

// Emits
const emit = defineEmits(["search", "toggle-cart"]);

// Состояние
const localSearchQuery = ref("");
const mobileMenuOpen = ref(false);

// Данные меню
const menuItems = ref([
  {
    id: 1,
    name: "Процессоры",
    icon: "fas fa-microchip",
    link: "#",
    section: "processors",
  },
  {
    id: 2,
    name: "Видеокарты",
    icon: "fas fa-tv",
    link: "#",
    section: "graphics",
  },
  {
    id: 3,
    name: "Память",
    icon: "fas fa-memory",
    link: "#",
    section: "memory",
  },
  {
    id: 4,
    name: "Накопители",
    icon: "fas fa-hdd",
    link: "#",
    section: "storage",
  },
]);

// Методы
const handleSearch = () => {
  emit("search", localSearchQuery.value);
};

const scrollToSection = (section) => {
  console.log(`Прокрутка к секции: ${section}`);
  mobileMenuOpen.value = false;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  border-bottom: 2px solid #3498db;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.nav-logo i {
  font-size: 2rem;
  color: #3498db;
}

.nav-search {
  flex: 1;
  max-width: 400px;
  margin: 0 2rem;
  position: relative;
}

.nav-search input {
  width: 100%;
  padding: 0.8rem 1rem;
  padding-right: 2.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s;
}

.nav-search input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.nav-search i {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-menu a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #3498db;
}

.nav-menu i {
  font-size: 1.1rem;
}

.nav-cart {
  position: relative;
  cursor: pointer;
  margin-left: 1rem;
}

.nav-cart i {
  font-size: 1.5rem;
  color: #555;
  transition: color 0.3s;
}

.nav-cart:hover i {
  color: #3498db;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e74c3c;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #555;
}

.mobile-menu {
  display: none;
  background: white;
  padding: 1rem;
  border-top: 1px solid #eee;
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
}

.mobile-menu li {
  margin: 0.5rem 0;
}

.mobile-menu a {
  text-decoration: none;
  color: #555;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.5rem;
}

.mobile-menu a:hover {
  background: #f8f9fa;
  color: #3498db;
}

@media (max-width: 1024px) {
  .nav-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: block;
  }

  .nav-search {
    max-width: 250px;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }

  .nav-logo span {
    display: none;
  }

  .nav-search {
    margin: 0 1rem;
    max-width: 150px;
  }
}
</style>
