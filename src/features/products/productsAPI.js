const BASE_URL = 'https://fakestoreapi.com';

export const productsAPI = {
  // Obtener todos los productos
  fetchAllProducts: async () => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Error al cargar productos');
    }
    return response.json();
  },

  // Obtener producto por ID
  fetchProductById: async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Producto no encontrado');
    }
    return response.json();
  },

  // Obtener categorías
  fetchCategories: async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Error al cargar categorías');
    }
    return response.json();
  },

  // Obtener productos por categoría
  fetchProductsByCategory: async (category) => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error('Error al cargar productos de la categoría');
    }
    return response.json();
  }
};