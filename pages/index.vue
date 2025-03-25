<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '~/components/auth/LoginForm.vue';

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(true);

onMounted(() => {
  // Инициализация состояния аутентификации
  authStore.initAuth();
  
  // Если пользователь уже аутентифицирован, перенаправляем на страницу аккаунта
  if (authStore.isAuthenticated) {
    router.push('/account');
  }
  
  loading.value = false;
});
</script>

<template>
  <div class="auth-page">
    <div v-if="!loading">
      <LoginForm />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}
</style>
