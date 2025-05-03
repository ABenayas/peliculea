#!/bin/bash
set -e # Para que se detenga con el primer error y no los arrastre.

echo "🧹 Borrando migraciones antiguas..."
rm -rf dist/migrations/*
rm -rf src/migrations/*

echo "🛑 Parando contenedores..."
make stop

echo "🗑️ Borrando volumen de la base de datos..."
sudo rm -rf database/db-data

echo "🚀 Arrancando contenedores frescos..."
make start &
sleep 7

echo "📦 Generando nueva migración..."
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migrations/InitialMigration -d src/data-source.ts

echo "🛠️ Compilando migración..."
npx tsc src/migrations/*.ts --outDir dist/migrations

echo "💾 Ejecutando migración..."
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/data-source.ts

echo "✅ Todo listo. Abre Adminer y goza: http://localhost:8080"