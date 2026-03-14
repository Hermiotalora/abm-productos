# ABM de Productos
Proyecto final del bootcamp BTech 

## Objetivo
Desarrollar una aplicación web utilizando React que permita gestionar información mediante operaciones de Alta, Baja y Modificación (ABM). La aplicación debe almacenar datos en Firebase Firestore y consumir al menos una API pública para demostrar el manejo de solicitudes externas.

## Funcionalidad principal
La aplicación permite gestionar una lista de productos. Cada elemento incluye nombre, descripción, precio y estado. Además, se pueden importar productos desde una API externa para editarlos localmente.

## Operaciones obligatorias (ABM)
- **Crear**: Agregar nuevos productos.
- **Leer**: Mostrar la lista de productos almacenados.
- **Actualizar**: Modificar un producto existente.
- **Eliminar**: Borrar productos.

Todas las operaciones se conectan con Firestore para persistencia de datos.

## Uso de base de datos
El proyecto utiliza Firebase Firestore para almacenar datos. Se implementan las operaciones de agregar documentos, leer documentos, actualizar documentos y eliminar documentos.

## Consumo de API pública
La aplicación consume la API de [EscuelaJS API](https://api.escuelajs.co/api/v1/products) utilizando fetch. Los datos obtenidos se muestran en la interfaz. El consumo se realiza utilizando el hook useEffect para cargar productos automáticamente al montar el componente.

## Requisitos técnicos
- **React con componentes funcionales**: Sí, todos los componentes son funcionales.
- **useState para manejo de estado**: Utilizado para productos locales y de API.
- **useEffect para efectos secundarios**: Para cargar datos de Firestore y API.
- **División en componentes reutilizables**: ItemList, ItemCard, ItemForm.
- **Estilos con CSS**: Archivos CSS incluidos.
- **Librería externa de interfaz o íconos**: Se utiliza React Icons para íconos en los botones.

## Tecnologías utilizadas
- React (componentes funcionales, useState, useEffect)
- Firebase Firestore
- Vite
- CSS
- React Icons (librería externa de íconos)

## Estructura del proyecto
- `src/components/` (ItemForm, ItemList, ItemCard)
- `src/services/firebase.js`
- `App.jsx`
- Archivos de estilos

## Instrucciones para ejecutar el proyecto
1. Clona el repositorio.
2. Instala las dependencias: `npm install`
3. Configura Firebase en `src/services/firebase.js` con tus credenciales.
4. Ejecuta el proyecto: `npm run dev`

## Enlace al deploy
(http://localhost:5173/)

# React + Vite

Esta plantilla proporciona una configuración mínima para hacer funcionar React en Vite con HMR y algunas reglas de ESLint.

Actualmente, hay dos plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) utiliza [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) utiliza [SWC](https://swc.rs/)
