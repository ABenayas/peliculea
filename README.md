# Proyecto Peliculea

App de gestión de películas con frontend en React y backend en NestJS. Permite buscar películas desde la API de TMDB, añadirlas a listas personalizadas (pendiente/vista) y gestionarlas por usuario.

---

## Tecnologías usadas

- **Frontend**: React + Vite + TypeScript
- **Backend**: NestJS + TypeORM
- **Base de datos**: PostgreSQL (Docker)
- **ORM**: TypeORM con migraciones
- **Docker**: para backend y base de datos
- **Adminer**: cliente SQL web

---

## Estructura del proyecto

```
peliculea/
├── backend/         # Backend NestJS (API REST)
├── frontend/        # Frontend React (cliente web)
├── README.md        # Este archivo
```

Cada parte incluye su propio `README.md` con instrucciones específicas.

---

## Cómo levantar el proyecto

### 1. Instala dependencias del frontend

```bash
cd frontend
npm install
```

### 2. Configura variables de entorno del backend

```bash
cd ../backend
cp .env.example .env
```

### 3. Levanta todo con un solo comando

```bash
./reset.sh
```

Este comando:

- Compila el backend
- Reinicia la base de datos
- Genera y aplica migraciones
- Arranca el backend en `http://localhost:3000`
- Arranca Adminer en `http://localhost:8080`
- Lanza también el frontend en `http://localhost:5173`

---

## Enlaces

- Backend: [`backend/`](./backend/)
- Frontend: [`frontend/`](./frontend/)
- Adminer (DB): [http://localhost:8080](http://localhost:8080)
- Repositorio en GitHub (public):https://github.com/ABenayas/peliculea.git

---

## Autor

Antonio Benayas, 2025.
