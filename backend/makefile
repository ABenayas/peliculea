include .env
ifndef DOCKER_COMPOSE_COMMAND
override DOCKER_COMPOSE_COMMAND = docker compose
endif

DOCKER_COMPOSE_COMMAND = docker-compose
DB_SERVICE = nestjs-database

help:
	@echo "Available commands:"
	@echo ""
	@echo "  make build    - Instala dependencias y construye las imágenes Docker."
	@echo "  make start    - Inicia los contenedores y muestra los logs."
	@echo "  make stop     - Detiene y elimina los contenedores."
	@echo ""

build:
	@echo "Building the Docker images"
	@npm install
	@$(DOCKER_COMPOSE_COMMAND) build

start:
	@echo "Starting the Docker containers"
	@$(DOCKER_COMPOSE_COMMAND) up -d
	@sleep 5
	@$(DOCKER_COMPOSE_COMMAND) logs -f

stop:
	@echo "Stopping the Docker containers"
	@$(DOCKER_COMPOSE_COMMAND) down