<script setup lang="ts">
// Используем хранилище для инициализации состояния приложения
import { useAuthStore } from './stores/auth';

// Инициализируем хранилище аутентификации
const authStore = useAuthStore();
authStore.initAuth();
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>

<style lang="scss">
@use "~/assets/styles/main.scss";
</style>

