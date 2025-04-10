FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache bash curl git

COPY package.json package-lock.json* ./
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

RUN npm install

COPY src ./src

EXPOSE 3000

CMD ["npm", "run", "start:dev"]