FROM node:19

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7070
CMD [ "npm", "run", "dev"]