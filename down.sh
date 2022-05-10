#!/bin/bash

# bring dev & prod down. will this cause problems doing both? idk
docker-compose down
docker-compose -f docker-compose-prod.yml down