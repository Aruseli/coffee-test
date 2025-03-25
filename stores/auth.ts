import { defineStore } from 'pinia';
import type { User, AuthState } from '~/types';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null
  }),
  
  actions: {
    async login(username: string, password: string): Promise<boolean> {
      try {
        // Имитация API запроса
        const response = await $fetch<{ success: boolean; username?: string; name?: string; surname?: string }>('/api/auth/login', {
          method: 'POST',
          body: { username, password }
        });
        
        if (response.success && response.username) {
          this.isAuthenticated = true;
          this.user = response.username;
          
          // Сохраняем в localStorage для сохранения сессии при обновлении
          localStorage.setItem('auth', JSON.stringify({
            isAuthenticated: true,
            user: response.username
          }));
          
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },
    
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      
      // Удаляем данные из localStorage
      localStorage.removeItem('auth');
    },
    
    // Восстановление состояния из localStorage при загрузке приложения
    initAuth() {
      if (typeof window !== 'undefined') {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
          try {
            const authData = JSON.parse(savedAuth);
            this.isAuthenticated = authData.isAuthenticated;
            this.user = authData.user;
          } catch (error) {
            console.error('Error parsing auth data:', error);
            this.logout();
          }
        }
      }
    }
  }
});
