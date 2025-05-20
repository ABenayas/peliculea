# Peliculea - Frontend

Este es el frontend de **Peliculea**, una aplicación de gestión de películas desarrollada con **React**, **TypeScript**, **Vite** y **Tailwind CSS**.

## Inicio rápido

```bash
cd frontend
npm install
npm run dev
```

La app estará disponible en: [http://localhost:5173](http://localhost:5173)

> Asegúrate de que el backend esté corriendo en `http://localhost:3000`.

## Autenticación

- El login requiere un usuario registrado en el backend (`/auth/login`).
- El token JWT se guarda en `localStorage` y se envía automáticamente en cada petición mediante interceptores de Axios.

## Funcionalidades

- Autenticación protegida con rutas privadas.
- Búsqueda de películas en TMDB.
- Añadir películas como “pendiente” o “vista”.
- Añadir notas y puntuaciones personales.
- Eliminar películas de tus listas.
- Navegación protegida y fluida entre páginas.
- Diseño consistente: las tarjetas de películas tienen el mismo alto y el botón siempre alineado abajo para evitar asimetrías.

## Estructura

```
frontend/
├── src/
│   ├── pages/           # Vistas principales (Home, Login, Movies, MovieDetails, UserMovies)
│   ├── components/      # Componentes reutilizables
│   ├── hooks/           # Hooks personalizados
│   ├── api.ts           # Configuración Axios
│   ├── main.tsx         # Punto de entrada
│   └── App.tsx          # Definición de rutas
```

## Variables de entorno

Crea un archivo `.env` en la raíz de `frontend/` con el siguiente contenido:

```env
VITE_API_URL=http://localhost:3000
```

Y asegúrate de que `api.ts` lo use así:

```ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```

## Autor

Antonio Benayas, 2025.
