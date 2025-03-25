<script setup lang="ts">
// Перенаправление на страницу аутентификации
import { navigateTo } from '#app';
import { onMounted } from 'vue';

// Используем onMounted для выполнения кода в контексте Vue
onMounted(() => {
  // Мгновенное перенаправление на страницу аутентификации
  navigateTo('/auth');
});
</script>

<template>
  <div>
    <!-- Пустой шаблон, т.к. перенаправление происходит мгновенно -->
  </div>
</template>
