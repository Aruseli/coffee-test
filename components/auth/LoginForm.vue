<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = 'Пожалуйста, введите логин и пароль';
    return;
  }
  
  loading.value = true;
  error.value = '';
  
  try {
    const success = await authStore.login(username.value, password.value);
    
    if (success) {
      router.push('/account');
    } else {
      error.value = 'Введены неверные данные авторизации. Попробуйте ещё раз';
    }
  } catch (e) {
    error.value = 'Произошла ошибка при входе. Пожалуйста, попробуйте позже';
    console.error('Login error:', e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="auth-card">
    <h2 class="auth-title">Вход в систему</h2>
    <p class="auth-subtitle">Введите ваш логин и пароль</p>
    
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Логин</label>
        <input 
          id="username"
          v-model="username"
          type="text"
          class="form-control"
          required
          autocomplete="username"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Пароль</label>
        <input 
          id="password"
          v-model="password"
          type="password"
          class="form-control"
          required
          autocomplete="current-password"
        />
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div class="form-group">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
// Дополнительные стили для компонента формы логина
.form-group {
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
}

.btn {
  width: 100%;
}

.auth-subtitle {
  text-align: center;
  margin-bottom: 20px;
  color: #666;
  font-size: 0.9rem;
}
</style>
