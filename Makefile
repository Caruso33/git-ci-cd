dev:
	docker-compose build && \
	docker-compose up --remove-orphans
prod:
	docker-compose build && \
	docker-compose -f docker-compose.yaml up --remove-orphans
test:
	docker-compose build && \
	docker-compose -f docker-compose.yaml -f docker-compose.test.yaml up --remove-orphans --abort-on-container-exit
test-watch:
	docker-compose build --build-arg npm_cmd="npm run test:watch" && \
	docker-compose -f docker-compose.yaml -f docker-compose.test.yaml up --remove-orphans