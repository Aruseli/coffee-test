// Типы для аутентификации
export interface Credentials {
  username: string;
  passphrase: string;
}

export interface User {
  name: string;
  surname: string;
  credentials: Credentials;
  active: boolean;
  created: string;
  _comment?: string;
}

// Типы для данных в таблице (выбрал тип данных - кофейные продукты)
export interface Product {
  id: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  date_created: string;
  name: string;
  category: 'coffee' | 'tea' | 'accessories' | 'snacks';
  price: number;
  description: string;
  rating: number;
  origin?: string;
}

// Типы для фильтров
export interface Filters {
  dateRange: {
    from: string | null;
    to: string | null;
  };
  selectedCategories: string[];
}

// Типы для состояния аутентификации
export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

// Типы для состояния продуктов
export interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  filters: Filters;
  loading: boolean;
  error: string | null;
}
