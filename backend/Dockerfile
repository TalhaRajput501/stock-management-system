FROM node:alpine

WORKDIR /backend 

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000 

CMD ["node", "server.js"]
# This is not good env are visible in image, when i run container in interactive mode. I can see env using cat .env .We have to make sure that should not show and use industry standards.