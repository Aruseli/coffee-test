<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useProductsStore } from '~/stores/products';

const productsStore = useProductsStore();

// Категории для фильтрации
const categories = [
  { value: 'coffee', label: 'Кофе' },
  { value: 'tea', label: 'Чай' },
  { value: 'accessories', label: 'Аксессуары' },
  { value: 'snacks', label: 'Закуски' }
];

// Состояние фильтров
const dateFrom = ref('');
const dateTo = ref('');
const selectedCategories = ref<string[]>([]);

// Применение фильтра по дате
const applyDateFilter = () => {
  productsStore.setDateFilter(
    dateFrom.value || null,
    dateTo.value || null
  );
};

// Применение фильтра по категории
const applyCategoryFilter = () => {
  productsStore.setCategoryFilter(selectedCategories.value);
};

// Сброс всех фильтров
const resetAllFilters = () => {
  dateFrom.value = '';
  dateTo.value = '';
  selectedCategories.value = [];
  productsStore.resetFilters();
};

// Инициализация фильтров из store при монтировании компонента
onMounted(() => {
  // Восстановление фильтров из store, если они есть
  updateFiltersFromStore();
  
  // Добавляем обработчик события для обновления фильтров
  window.addEventListener('update-filters', handleUpdateFilters);
});

// Удаляем обработчик события при размонтировании компонента
onUnmounted(() => {
  window.removeEventListener('update-filters', handleUpdateFilters);
});

// Функция обновления фильтров из хранилища
const updateFiltersFromStore = () => {
  const storeFilters = productsStore.filters;
  
  // Обновляем дату "от"
  if (storeFilters.dateRange.from) {
    dateFrom.value = storeFilters.dateRange.from;
  }
  
  // Обновляем дату "до"
  if (storeFilters.dateRange.to) {
    dateTo.value = storeFilters.dateRange.to;
  }
  
  // Обновляем категории
  if (storeFilters.selectedCategories.length > 0) {
    selectedCategories.value = [...storeFilters.selectedCategories];
  }
};

// Обработчик события обновления фильтров
const handleUpdateFilters = (event: Event) => {
  const customEvent = event as CustomEvent;
  if (customEvent.detail) {
    // Обновляем интерфейс фильтров
    updateFiltersFromStore();
  }
};
</script>

<template>
  <div class="filters">
    <h3>Фильтры</h3>
    
    <div class="filters-grid">
      <!-- Фильтр по дате -->
      <div class="filter-group">
        <h4>Дата создания</h4>
        <div class="date-range">
          <div class="date-input">
            <label for="date-from">От</label>
            <input 
              id="date-from"
              v-model="dateFrom"
              type="date"
              class="form-control"
              @change="applyDateFilter"
            />
          </div>
          <div class="date-input">
            <label for="date-to">До</label>
            <input 
              id="date-to"
              v-model="dateTo"
              type="date"
              class="form-control"
              @change="applyDateFilter"
            />
          </div>
        </div>
      </div>
      
      <!-- Фильтр по категории -->
      <div class="filter-group">
        <h4>Категория</h4>
        <div class="category-checkboxes">
          <div v-for="category in categories" :key="category.value" class="checkbox-item">
            <input 
              :id="`category-${category.value}`"
              v-model="selectedCategories"
              :value="category.value"
              type="checkbox"
              @change="applyCategoryFilter"
            />
            <label :for="`category-${category.value}`">{{ category.label }}</label>
          </div>
        </div>
      </div>
    </div>
    
    <div class="filter-actions">
      <button class="btn btn-primary" @click="resetAllFilters">
        Сбросить фильтры
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filters {
  margin-bottom: 20px;
  
  h3 {
    margin-bottom: 15px;
    font-size: 1.2rem;
  }
  
  h4 {
    margin-bottom: 10px;
    font-size: 1rem;
    font-weight: 600;
  }
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.filter-group {
  margin-bottom: 15px;
}

.date-range {
  display: flex;
  gap: 10px;
  
  .date-input {
    flex: 1;
    
    label {
      display: block;
      margin-bottom: 5px;
      font-size: 0.9rem;
    }
  }
}

.category-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  .checkbox-item {
    display: flex;
    align-items: center;
    
    input[type="checkbox"] {
      margin-right: 8px;
    }
  }
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
</style>
