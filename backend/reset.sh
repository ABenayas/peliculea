#!/bin/bash
set -e

echo "🧹 Borrando migraciones antiguas..."
rm -rf dist/
rm -rf src/migrations/
mkdir -p src/migrations

echo "🛑 Parando contenedores..."
make stop

echo "🗑️ Borrando volumen de la base de datos..."
sudo rm -rf database/db-data

echo "🔧 Reconstruyendo imagen Docker..."
docker compose build

echo "🚀 Arrancando contenedores frescos..."
make start &
sleep 7

echo "📦 Compilando proyecto..."
npm run build
npm run build:data-source

echo "🛠️ Generando nueva migración..."
npx typeorm migration:generate src/migrations/InitialMigration -d dist/src/data-source.js

echo "📦 Compilando migraciones..."
npx tsc src/migrations/*.ts --outDir dist/migrations

echo "💾 Ejecutando migración..."
npx typeorm migration:run -d dist/src/data-source.js

echo "✅ Todo listo. Abre Adminer y goza: http://localhost:8080"

