<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// Используем хранилище для инициализации состояния приложения
import { useAuthStore } from './stores/auth';

// Инициализируем хранилище аутентификации
const authStore = useAuthStore();
authStore.initAuth();
</script>
