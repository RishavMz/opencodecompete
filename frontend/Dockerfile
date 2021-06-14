FROM node:alpine

WORKDIR /nodeapp

COPY package.json /nodeapp
COPY package-lock.json /nodeapp

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm" , "start" ]