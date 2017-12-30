FROM node:9.3-slim

WORKDIR /usr/src/app

COPY package.json .
RUN yarn install --prod

COPY index.js .
COPY .env .

CMD ["node", "index.js"]
