FROM node:20-slim

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install 

EXPOSE 4000

CMD ["npx", "expo", "start"]