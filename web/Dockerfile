FROM node:8.2.0-alpine

# Prepare app directory
RUN mkdir -p /web
WORKDIR /web

# Install dependencies
COPY package.json /web/
RUN npm install --silent

ADD . /web/

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:server" ]