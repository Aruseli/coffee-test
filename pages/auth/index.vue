<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '~/components/auth/LoginForm.vue';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  // Инициализация состояния аутентификации
  authStore.initAuth();
  
  // Если пользователь уже аутентифицирован, перенаправляем на страницу аккаунта
  if (authStore.isAuthenticated) {
    router.push('/account');
  }
});
</script>

<template>
  <div class="auth-page">
    <LoginForm />
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
