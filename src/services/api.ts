import { Product } from '../types';

class ProductsAPI {
  private static readonly BASE_URL = 'https://fakestoreapi.com';
  private static readonly TIMEOUT = 10000;

  private static async fetchWithTimeout(url: string, timeout: number = this.TIMEOUT): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  static async fetchAllProducts(): Promise<Product[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}/products`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al cargar productos: ${error.message}`);
      }
      throw new Error('Error desconocido al cargar productos');
    }
  }

  static async fetchCategories(): Promise<string[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}/products/categories`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: string[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al cargar categorías: ${error.message}`);
      }
      throw new Error('Error desconocido al cargar categorías');
    }
  }

  static async fetchProductById(id: number): Promise<Product> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}/products/${id}`);
      
      if (!response.ok) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      
      const data: Product = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al cargar producto: ${error.message}`);
      }
      throw new Error('Error desconocido al cargar producto');
    }
  }
}

export default ProductsAPI;