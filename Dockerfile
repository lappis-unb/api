FROM node:alpine

WORKDIR /api

COPY package.json ./

RUN npm install

COPY . . 

EXPOSE 4040

CMD ["node", "app.js"]