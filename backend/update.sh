#!/bin/bash

docker-compose -f prod.yml pull
docker-compose -f prod.yml up -d
docker system prune --all -f
