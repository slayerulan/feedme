FROM node:8.2.0-alpine

# Prepare app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

# Install dependencies
COPY package.json /usr/src/app/
RUN npm install --silent

ADD . /usr/src/app/

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:server" ]