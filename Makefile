.PHONY: up down build restart logs migrate createsuperuser

up:
	docker-compose up -d --build

down:
	docker-compose down

build:
	docker-compose build

restart:
	docker-compose down && docker-compose up -d --build

logs:
	docker-compose logs -f

migrate:
	docker-compose exec backend python manage.py migrate

createsuperuser:
	docker-compose exec backend python manage.py createsuperuser
