#!/bin/bash
# Se decide crear este archivo para arrancar tanto el backend como frontend de una sola vez. Es un archivo creado por una consulta realizada a ChatGPT (OpenAI). Queda referenciado en la memoria. (ChatGPT, s.f.)
set -e

echo "🗑️ Borrando dist/ y migraciones antiguas..."
rm -rf dist/
rm -rf src/migrations/
mkdir -p src/migrations

echo "📦 Compilando todo el proyecto con TSC..."
npm run build

echo "🛑 Parando contenedores..."
docker compose down

echo "🗑️ Borrando volumen de la base de datos..."
sudo chown -R $USER:$USER database/db-data # Sigue pidiéndome la contraseña...
rm -rf database/db-data # Da problemas sin el sudo, por eso se indica la línea anterior, así se ahorra el meter pass.

echo "🛠️ Levantando contenedores..."
docker compose up -d --build

echo "⏳ Esperando a que la base de datos esté disponible..."
sleep 7

echo "🛠️ Generando migración dentro del contenedor..."
docker exec -it nestjs-app npx typeorm migration:generate src/migrations/InitialMigration -d dist/data-source.js

echo "📦 Compilando migraciones..."
npx tsc src/migrations/*.ts --outDir dist/migrations

echo "💾 Ejecutando migración dentro del contenedor..."
docker exec -i nestjs-app npx typeorm migration:run -d dist/data-source.js

echo "✅ Backend operativo. Adminer en: http://localhost:8080"

echo "✅ Todo listo. Iniciando Frontend (modo desarrollo)..."
(cd ../frontend && npm run dev > ../frontend/dev.log 2>&1 &)

