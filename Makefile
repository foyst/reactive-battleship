# SHELL := /bin/bash

build:
	cd reactive-position-generator; sbt clean compile assembly docker:publishLocal
	cd reactive-geofence-detector; sbt clean compile assembly docker:publishLocal
	cd reactive-websocket-client; sbt clean compile assembly docker:publishLocal

start:
	docker-compose up -d zookeeper grafana; sleep 5;
	docker-compose up -d kafka1; sleep 10;
	docker-compose up -d geofence-detector
	# docker-compose up -d

stop:
	docker-compose kill && docker-compose rm -f
