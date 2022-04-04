FROM node:16
WORKDIR /usr/src/ubuntu
COPY package.json .
RUN npm install
COPY . .
RUN npm run --script build
EXPOSE 8000
CMD node dist/main.js