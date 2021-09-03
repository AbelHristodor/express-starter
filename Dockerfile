FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent
RUN npm i -g nodemon

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]