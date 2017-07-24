FROM node:8.2.0-alpine

# Prepare app directory
RUN mkdir -p /queueConsumer
WORKDIR /queueConsumer

# Install dependencies
COPY package.json /queueConsumer/
RUN npm install --silent

ADD . /queueConsumer/

CMD [ "npm", "start" ]