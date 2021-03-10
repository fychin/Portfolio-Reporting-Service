FROM node:14.16.0-slim

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

EXPOSE 80
CMD [ "node", "dist/app.js" ]