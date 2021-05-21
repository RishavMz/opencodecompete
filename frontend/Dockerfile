FROM node:alpine

WORKDIR /frontend

COPY package.json /frontend
COPY package-lock.json /frontend

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm" , "start" ]