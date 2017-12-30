FROM node:9.3-slim

WORKDIR /usr/src/app

COPY package.json .
RUN yarn install --prod
RUN yarn global add serve

COPY build .

CMD ["serve", "-p 3000"]
