# 🛒 E-commerce App con React + Redux + TypeScript

Aplicación de comercio electrónico desarrollada con React, Redux Toolkit y TypeScript, incluyendo una suite completa de pruebas con Jest.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Testing](#testing)
- [Arquitectura](#arquitectura)

## ✨ Características

- ✅ Catálogo de productos con datos de [FakeStore API](https://fakestoreapi.com/)
- ✅ Filtrado por categorías
- ✅ Carrito de compras funcional
- ✅ Gestión de estado con Redux Toolkit
- ✅ TypeScript para type safety
- ✅ Diseño responsive con Tailwind CSS
- ✅ Suite completa de pruebas con Jest
- ✅ Cobertura de código del 76%+

## 🚀 Tecnologías

### Frontend
- **React 18.2** - Biblioteca de UI
- **TypeScript 4.9.5** - Tipado estático
- **Redux Toolkit 2.0** - Gestión de estado
- **Tailwind CSS** - Estilos utility-first

### Testing
- **Jest 29.7** - Framework de testing
- **React Testing Library 14.1** - Testing de componentes
- **ts-jest 29.1** - Transformador TypeScript para Jest

### Herramientas
- **React Scripts 5.0** - Configuración de build
- **ESLint** - Linting de código

## 📁 Estructura del Proyecto
ecommerce-app/
├── src/
│   ├── tests/           # Utilidades de testing
│   │   └── utils.tsx        # renderWithProviders helper
│   ├── mocks/           # Mocks para testing
│   │   └── api.ts           # Mock de ProductsAPI
│   ├── app/                 # Configuración de Redux
│   │   ├── hooks.ts         # Custom hooks (useAppDispatch, useAppSelector)
│   │   └── store.ts         # Configuración del store
│   ├── components/
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartItem.test.tsx
│   │   │   ├── ShoppingCart.tsx
│   │   │   └── ShoppingCart.test.tsx
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.test.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── Loading.test.tsx
│   │   │   ├── Rating.tsx
│   │   │   └── Rating.test.tsx
│   │   └── products/
│   │       ├── CategoryFilter.tsx
│   │       ├── CategoryFilter.test.tsx
│   │       ├── ProductCard.tsx
│   │       ├── ProductCard.test.tsx
│   │       ├── ProductList.tsx
│   │       └── ProductList.test.tsx
│   ├── features/
│   │   ├── cart/
│   │   │   ├── cartSlice.ts
│   │   │   └── cartSlice.test.ts
│   │   └── products/
│   │       ├── productsSlice.ts
│   │       └── productsSlice.test.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── api.test.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.test.tsx
│   └── index.tsx
├── jest.config.js           # Configuración de Jest
├── jest.setup.js            # Setup global de Jest
├── tsconfig.json            # Configuración de TypeScript
└── package.json