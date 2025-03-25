import { defineStore } from 'pinia';
import type { Product, ProductsState, Filters } from '~/types';

// Ключ для хранения фильтров в localStorage
const FILTERS_STORAGE_KEY = 'coffee-app-filters';

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => {
    // Восстанавливаем фильтры из localStorage при инициализации store
    let savedFilters = null;
    
    if (process.client) {
      const savedFiltersJson = localStorage.getItem(FILTERS_STORAGE_KEY);
      if (savedFiltersJson) {
        try {
          savedFilters = JSON.parse(savedFiltersJson);
          console.log('Загружены фильтры из localStorage:', savedFilters);
        } catch (e) {
          console.error('Ошибка при разборе сохраненных фильтров:', e);
        }
      }
    }
    
    return {
      products: [],
      filteredProducts: [],
      filters: savedFilters || {
        dateRange: {
          from: null,
          to: null
        },
        selectedCategories: []
      },
      loading: false,
      error: null
    };
  },
  
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        // Имитация API запроса
        const products = await $fetch<Product[]>('/api/products');
        this.products = products;
        
        // Применяем фильтры к полученным данным
        this.applyFilters();
        
        // Дополнительно обновляем интерфейс фильтров
        this.updateFiltersUI();
        
        // Выводим в консоль информацию о фильтрах для отладки
        console.log('Filters applied:', this.filters);
        console.log('Filtered products count:', this.filteredProducts.length);
      } catch (error) {
        console.error('Error fetching products:', error);
        this.error = 'Ошибка при загрузке данных';
      } finally {
        this.loading = false;
      }
    },
    
    setDateFilter(from: string | null, to: string | null) {
      this.filters.dateRange = { from, to };
      this.saveFiltersToStorage();
      this.applyFilters();
    },
    
    setCategoryFilter(categories: string[]) {
      this.filters.selectedCategories = categories;
      this.saveFiltersToStorage();
      this.applyFilters();
    },
    
    resetFilters() {
      this.filters = {
        dateRange: {
          from: null,
          to: null
        },
        selectedCategories: []
      };
      this.saveFiltersToStorage();
      this.applyFilters();
    },
    
    // Сохраняем фильтры в localStorage
    saveFiltersToStorage() {
      if (process.client) {
        localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(this.filters));
      }
    },
    
    // Обновляем интерфейс фильтров через событие
    updateFiltersUI() {
      if (process.client) {
        // Создаем и диспетчеризуем событие для обновления интерфейса фильтров
        window.dispatchEvent(new CustomEvent('update-filters', { 
          detail: this.filters 
        }));
      }
    },
    
    applyFilters() {
      let filtered = [...this.products];
      
      // Фильтрация по дате
      if (this.filters.dateRange.from || this.filters.dateRange.to) {
        console.log('Applying date filters:', this.filters.dateRange);
        
        filtered = filtered.filter(product => {
          // Преобразуем дату продукта в объект Date
          const productDate = new Date(product.date_created);
          console.log(`Product ${product.id} date:`, product.date_created, productDate);
          
          if (this.filters.dateRange.from && this.filters.dateRange.to) {
            // Если заданы обе даты
            const fromDate = new Date(this.filters.dateRange.from + 'T00:00:00');
            const toDate = new Date(this.filters.dateRange.to + 'T23:59:59.999');
            
            console.log(`Comparing with range: ${fromDate} - ${toDate}`);
            return productDate >= fromDate && productDate <= toDate;
          } else if (this.filters.dateRange.from) {
            // Только начальная дата
            const fromDate = new Date(this.filters.dateRange.from + 'T00:00:00');
            console.log(`Comparing with from date: ${fromDate}`);
            return productDate >= fromDate;
          } else if (this.filters.dateRange.to) {
            // Только конечная дата
            const toDate = new Date(this.filters.dateRange.to + 'T23:59:59.999');
            console.log(`Comparing with to date: ${toDate}`);
            return productDate <= toDate;
          }
          
          return true;
        });
        
        console.log(`After date filtering: ${filtered.length} products`);
      }
      
      // Фильтрация по категориям
      if (this.filters.selectedCategories.length > 0) {
        filtered = filtered.filter(product => 
          this.filters.selectedCategories.includes(product.category)
        );
      }
      
      this.filteredProducts = filtered;
    }
  }
});
