export const mockProducts = [
  {
    id: 1,
    title: 'Producto de Prueba 1',
    price: 100,
    description: 'Descripción del producto 1',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 4.5,
      count: 120
    }
  },
  {
    id: 2,
    title: 'Producto de Prueba 2',
    price: 200,
    description: 'Descripción del producto 2',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: {
      rate: 3.9,
      count: 80
    }
  },
];

export const fetchProducts = jest.fn(() => Promise.resolve(mockProducts));

export const fetchCategories = jest.fn(() => 
  Promise.resolve(['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'])
);