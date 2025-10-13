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

### Componentes

| Ruta | Descripción |
|------|-------------|
| `src/components/cart/` | Componentes del carrito de compras |
| `src/components/common/` | Componentes reutilizables (Header, Loading, Rating) |
| `src/components/products/` | Componentes de productos y catálogo |

### Redux

| Ruta | Descripción |
|------|-------------|
| `src/app/store.ts` | Configuración del Redux store |
| `src/features/cart/` | Slice del carrito (estado + acciones) |
| `src/features/products/` | Slice de productos (estado + acciones) |

### Tests

| Tipo | Ubicación | Cantidad |
|------|-----------|----------|
| Componentes | `*.test.tsx` | 9 archivos |
| Redux | `*.test.ts` | 3 archivos |
| Servicios | `api.test.ts` | 1 archivo |
| Utilidades | `__tests__/utils.tsx` | Helpers |

### Configuración

| Archivo | Propósito |
|---------|-----------|
| `jest.config.js` | Configuración de Jest |
| `jest.setup.js` | Setup global de tests |
| `tsconfig.json` | Configuración de TypeScript |