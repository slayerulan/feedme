FROM node:8.2.0-alpine

# Prepare app directory
RUN mkdir -p /packetConsumer
WORKDIR /packetConsumer

# Install dependencies
COPY package.json /packetConsumer/
RUN npm install --silent

ADD . /packetConsumer/

CMD [ "npm", "start" ]