FROM node:20-alpine

WORKDIR /test_pro/src/app

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 8000

CMD ["npm", "run", "dev"]
