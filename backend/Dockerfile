FROM node:alpine

WORKDIR /nodeserver

COPY package.json /nodeserver
COPY package-lock.json /nodeserver

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node" , "index.js" ]