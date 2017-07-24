/* eslint no-console:0 */

import net from 'net';
import RabbitMQAdaptor from './src/queue';
import FeedHandler from './src/feedHandler';

const rabbitConnectionString = process.env.RABBIT_URL || 'amqp://rabbitmq:rabbitmq@localhost:5672//feedme';
const rabbitQueue = process.env.RABBIT_QUEUE || 'feedme.all';
const providerPort = process.env.PROVIDER_PORT || 8282;
const providerHost = process.env.PROVIDER_HOST || 'localhost';

const client = new net.Socket(); 
const messageQueue = new RabbitMQAdaptor(rabbitConnectionString, rabbitQueue);
const feedHandler = new FeedHandler(messageQueue);

const awaitConnection = (feedHandler, providerPort, providerHost) => {
    if (messageQueue.testConnection()) {
        connect(feedHandler, providerPort, providerHost);
    }
    else {
        setTimeout(() => {
            awaitConnection(feedHandler, providerPort, providerHost);
        }, 1000);
    }
};

const connect = (feedHandler, providerPort, providerHost) => {
    client.connect(providerPort, providerHost, async () =>  { 
        console.log(`Connected to ${providerHost}:${providerPort}`); 
    }); 

    client.on('data', function(data) { 
        // console.log('Received: ' + data); 
        feedHandler.handle(data.toString()); 
    }); 
    
    client.on('close', function() { 
        console.log('Connection closed'); 
    });
};

awaitConnection(feedHandler, providerPort, providerHost);

