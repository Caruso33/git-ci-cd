dev:
	docker-compose up --remove-orphans
prod:
	docker-compose -f docker-compose.yaml up --remove-orphans
test:
	docker-compose -f docker-compose.yaml -f docker-compose.test.yaml up --remove-orphans