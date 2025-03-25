<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useProductsStore } from '~/stores/products';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ProductFilters from '~/components/account/ProductFilters.vue';
import ProductsTable from '~/components/account/ProductsTable.vue';

const router = useRouter();
const authStore = useAuthStore();
const productsStore = useProductsStore();

// Обработка выхода из системы
const handleLogout = () => {
  authStore.logout();
  router.push('/auth');
};

onMounted(async () => {
  // Инициализация состояния аутентификации
  authStore.initAuth();
  
  // Если пользователь не аутентифицирован, перенаправляем на страницу авторизации
  if (!authStore.isAuthenticated) {
    router.push('/auth');
    return;
  }
  
  // Загрузка данных о продуктах
  await productsStore.fetchProducts();
});
</script>

<template>
  <div class="account-page">
    <div class="account-header">
      <h1>Личный кабинет</h1>
      <button class="btn btn-danger logout-btn" @click="handleLogout">
        <UIcon name="i-heroicons-arrow-right-on-rectangle" class="logout-icon" />
        Выход
      </button>
    </div>
    
    <div class="account-content">
      <ProductFilters />
      <ProductsTable />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.account-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h1 {
    font-size: 1.8rem;
    margin: 0;
  }
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logout-icon {
  width: 18px;
  height: 18px;
}

.account-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
