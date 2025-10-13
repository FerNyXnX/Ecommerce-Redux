import ProductsAPI from './api';

// Declarar el tipo de global.fetch para TypeScript
declare const global: typeof globalThis;

global.fetch = jest.fn() as jest.Mock;

describe('ProductsAPI Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllProducts', () => {
    test('fetches products successfully', async () => {
      const mockProducts = [
        { 
          id: 1, 
          title: 'Product 1', 
          price: 100, 
          description: 'Desc', 
          category: 'electronics', 
          image: 'img.jpg', 
          rating: { rate: 4, count: 10 } 
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const products = await ProductsAPI.fetchAllProducts();

      expect(fetch).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products',
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
      expect(products).toEqual(mockProducts);
    });

    test('throws error on failed fetch', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(ProductsAPI.fetchAllProducts()).rejects.toThrow('Error al cargar productos');
    });

    test('handles network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(ProductsAPI.fetchAllProducts()).rejects.toThrow('Error al cargar productos');
    });
  });

  describe('fetchCategories', () => {
    test('fetches categories successfully', async () => {
      const mockCategories = ['electronics', 'jewelery'];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      });

      const categories = await ProductsAPI.fetchCategories();

      expect(fetch).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products/categories',
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
      expect(categories).toEqual(mockCategories);
    });

    test('throws error on failed fetch', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(ProductsAPI.fetchCategories()).rejects.toThrow('Error al cargar categorías');
    });
  });

  describe('fetchProductById', () => {
    test('fetches single product successfully', async () => {
      const mockProduct = { 
        id: 1, 
        title: 'Product 1', 
        price: 100, 
        description: 'Desc', 
        category: 'electronics', 
        image: 'img.jpg', 
        rating: { rate: 4, count: 10 } 
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      });

      const product = await ProductsAPI.fetchProductById(1);

      expect(fetch).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products/1',
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
      expect(product).toEqual(mockProduct);
    });

    test('throws error when product not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(ProductsAPI.fetchProductById(999)).rejects.toThrow('Error al cargar producto');
    });
  });
});