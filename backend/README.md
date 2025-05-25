# Backend Peliculea (NestJS + TypeORM + PostgreSQL)

Este es el backend del proyecto Peliculea, una app de gestión de películas. Está construido con NestJS, Docker y PostgreSQL, y usa TypeORM para ORM y migraciones.

---

## Inicio rápido

### 1. Requisitos

- Docker + Docker Compose
- Node.js >= 18
- WSL (Windows)

### 2. Configura tu entorno

Crea un archivo `.env` en la raíz del backend, basado en `.env.example`:

```bash
cp .env.example .env
```

### 3. Levanta todo con:

```bash
./reset.sh
```

Este script:

- Borra la base de datos y migraciones previas
- Compila el backend con `tsc`
- Genera y ejecuta la migración inicial
- Deja el backend funcionando en `http://localhost:3000`
- Adminer disponible en `http://localhost:8080`
- Inicia el frontend

---

## Comandos útiles

```bash
npm run build              # Compila todo con TSC
npm run start:dev          # Modo desarrollo
npm run test               # Lanza los tests
npm run migration:generate # Genera migración tras cambios en entidades
npm run migration:run      # Aplica migraciones pendientes
```

---

## 🗃️ Estructura

```
src/
├── users/
├── auth/
├── movies/
├── user-movies/
├── migrations/
```

---

## Base de datos

- PostgreSQL (Docker)
- Adminer para visualización: `http://localhost:8080`
- Datos almacenados en `database/db-data` (persistentes)
- Migraciones en `src/migrations/`

---

## Estado actual

- [x] Backend dockerizado
- [x] `.env` funcionando
- [x] Reset completo con `reset.sh`
- [x] Migraciones funcionando
- [x] Adminer activo
- [x] Listo para entrega o despliegue

---

## 👨‍💻 Autor

Antonio Benayas, 2025.
