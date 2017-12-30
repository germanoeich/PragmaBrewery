#!/bin/bash

cd api
yarn build

cd ../web
yarn build

sudo docker-compose build