#!/bin/bash

docker-compose -f prod.yml pull
docker-compose -f prod.yml up -d
