// Tipos para los productos
export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

// Tipos para el carrito
export interface CartItem extends Product {
  quantity: number;
}

// Tipos para los estados de Redux
export interface ProductsState {
  items: Product[];
  categories: string[];
  selectedCategory: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentProduct: Product | null;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Tipos para las acciones
export interface UpdateQuantityPayload {
  productId: number;
  quantity: number;
}

// Tipos para respuestas de API
export type ApiResponse<T> = {
  data: T;
  error?: string;
};

// Enums
export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed'
}

export enum ProductCategory {
  All = 'all',
  Electronics = 'electronics',
  Jewelery = 'jewelery',
  MensClothing = "men's clothing",
  WomensClothing = "women's clothing"
}