FROM node:9.3-slim

WORKDIR /usr/src/app

COPY package.json .
RUN yarn install --prod

COPY dist .

CMD ["node", "index.js"]
