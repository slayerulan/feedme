/* eslint no-console:0 */

import net from 'net';
import RabbitMQAdaptor from './src/queue';
import FeedHandler from './src/feedHandler';

const rabbitConnectionString = 'amqp://rabbitmq:rabbitmq@localhost:5672//feedme';
const rabbitQueue = 'feedme.all';

const client = new net.Socket();
const messageQueue = new RabbitMQAdaptor(rabbitConnectionString, rabbitQueue);

const feedHandler = new FeedHandler(messageQueue);

client.connect(8282, 'localhost', async () =>  {
    console.log('Connected to localhost:8282');
});

client.on('data', function(data) {
    // console.log('Received: ' + data);
    feedHandler.handle(data.toString());
});

client.on('close', function() {
    console.log('Connection closed');
});