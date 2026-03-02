<template>
  <div class="home-page">
    <HeroSection />

    <CategoriesGrid :categories="categories" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import HeroSection from "./HeroSection.vue";
import CategoriesGrid from "./CategoriesGrid.vue";

const categories = ref([]);

const categoryIcons = {
  processors: "https://cdn-icons-png.flaticon.com/512/4738/4738920.png",
  video_cards: "https://cdn-icons-png.flaticon.com/512/3849/3849880.png",
  ram: "https://cdn-icons-png.flaticon.com/512/900/900330.png",
  ssd: "https://cdn-icons-png.flaticon.com/512/2286/2286814.png",
  motherboards: "https://cdn-icons-png.flaticon.com/512/2124/2124065.png",
  power_supplies: "https://cdn-icons-png.flaticon.com/512/2507/2507398.png",
  buildings: "https://cdn-icons-png.flaticon.com/512/6329/6329098.png",
  monitors: "https://cdn-icons-png.flaticon.com/512/3474/3474360.png",
  coolers: "https://cdn-icons-png.flaticon.com/512/2729/2729134.png",
  keyboards: "https://cdn-icons-png.flaticon.com/512/689/689392.png",
  mice: "https://cdn-icons-png.flaticon.com/512/10534/10534765.png",
  headphones: "https://cdn-icons-png.flaticon.com/512/2353/2353224.png",
};

const fetchCategories = async () => {
  try {
    const categoriesList = [
      {
        id: 1,
        name: "Процессоры",
        icon: categoryIcons.processors,
        products: [],
      },
      {
        id: 2,
        name: "Видеокарты",
        icon: categoryIcons.video_cards,
        products: [],
      },
      {
        id: 3,
        name: "Оперативная память",
        icon: categoryIcons.ram,
        products: [],
      },
      { id: 4, name: "SSD накопители", icon: categoryIcons.ssd, products: [] },
      {
        id: 5,
        name: "Материнские платы",
        icon: categoryIcons.motherboards,
        products: [],
      },
      {
        id: 6,
        name: "Блоки питания",
        icon: categoryIcons.power_supplies,
        products: [],
      },
      { id: 7, name: "Корпусы", icon: categoryIcons.buildings, products: [] },
      { id: 8, name: "Мониторы", icon: categoryIcons.monitors, products: [] },
      { id: 9, name: "Кулеры", icon: categoryIcons.coolers, products: [] },
      {
        id: 10,
        name: "Клавиатуры",
        icon: categoryIcons.keyboards,
        products: [],
      },
      { id: 11, name: "Мышки", icon: categoryIcons.mice, products: [] },
      {
        id: 12,
        name: "Наушники",
        icon: categoryIcons.headphones,
        products: [],
      },
    ];

    const categoryUrls = {
      1: "Processors",
      2: "Video_cards",
      3: "RAM",
      4: "SSD",
      5: "Motherboards",
      6: "Power_supplies",
      7: "Buildings",
      8: "Monitors",
      9: "Coolers",
      10: "Keyboards",
      11: "Mice",
      12: "Headphones",
    };

    const promises = categoriesList.map(async (category) => {
      try {
        const response = await axios.get(
          `https://b264ce7a51299334.mokky.dev/${categoryUrls[category.id]}`,
        );
        return {
          ...category,
          products: response.data,
        };
      } catch (err) {
        console.error(`Ошибка загрузки ${category.name}:`, err);
        return {
          ...category,
          products: [],
        };
      }
    });

    const results = await Promise.all(promises);
    categories.value = results;
  } catch (err) {
    console.error("Ошибка загрузки категорий:", err);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}
</style>
