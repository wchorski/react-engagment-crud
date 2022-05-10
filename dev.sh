#!/bin/bash

echo '[[ did you edit the ".env" file with your stuff? ]]'


cp .env ./client/.env
echo 'copied .env file over to client'
cat ./client/.env


docker-compose up -d --build -V