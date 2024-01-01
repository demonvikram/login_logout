FROM node:20
LABEL maintainer="Suyash Vikram Singh"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]
