#!/bin/bash

cd api
yarn
yarn build

cd ../web
yarn
yarn build

sudo docker-compose build