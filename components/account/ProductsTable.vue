<script setup lang="ts">
import { computed } from 'vue';
import { useProductsStore } from '~/stores/products';

const productsStore = useProductsStore();

const loading = computed(() => productsStore.loading);
const products = computed(() => productsStore.filteredProducts);

// Форматирование категории
const formatCategory = (category: string): string => {
  const categories: Record<string, string> = {
    coffee: 'Кофе',
    tea: 'Чай',
    accessories: 'Аксессуары',
    snacks: 'Закуски'
  };
  
  return categories[category] || category;
};

// Форматирование статуса
const formatStatus = (status: string): string => {
  const statuses: Record<string, string> = {
    active: 'Активен',
    inactive: 'Неактивен',
    out_of_stock: 'Нет в наличии'
  };
  
  return statuses[status] || status;
};

// Получение цвета для статуса
const getStatusColor = (status: string): "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral" => {
  const colors: Record<string, "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"> = {
    active: 'primary',
    inactive: 'neutral',
    out_of_stock: 'error'
  };
  
  return colors[status] || 'neutral';
};

// Форматирование даты
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
</script>

<template>
  <div>
    <div class="table-container">
      <table class="table" v-if="!loading && products.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Цена</th>
            <th>Рейтинг</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ formatCategory(product.category) }}</td>
            <td>
              <UBadge :color="getStatusColor(product.status)">{{ formatStatus(product.status) }}</UBadge>
            </td>
            <td>{{ formatDate(product.date_created) }}</td>
            <td>{{ product.price }} ₽</td>
            <td>
              <div class="rating">
                {{ product.rating }}/5
                <div class="stars">
                  <UIcon v-for="i in Math.floor(product.rating)" :key="i" name="i-heroicons-star-solid" class="star filled" />
                  <UIcon v-if="product.rating % 1 > 0" name="i-heroicons-star-half-solid" class="star half-filled" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-else-if="loading" class="loading-state">
        <UIcon name="i-heroicons-arrow-path" class="loading-icon" />
        <p>Загрузка данных...</p>
      </div>
      
      <div v-else-if="products.length === 0" class="empty-state">
        <p>Нет данных для отображения</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-state, .empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}

.loading-icon {
  font-size: 2rem;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.rating {
  display: flex;
  align-items: center;
  
  .stars {
    display: flex;
    margin-left: 8px;
  }
  
  .star {
    width: 16px;
    height: 16px;
    
    &.filled {
      color: gold;
    }
    
    &.half-filled {
      color: gold;
    }
  }
}
</style>
