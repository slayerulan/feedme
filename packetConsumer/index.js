/* eslint no-console:0 */

import net from 'net';
import QueueAdaptor from './src/queue';
import FeedHandler from './src/feedHandler';

// const mongoConnectionString = 'mongodb://localhost:27018/feedme';
const rabbitConnectionString = 'amqp://rabbitmq:rabbitmq@localhost:5672//feedme';
const rabbitQueue = 'feedme.all';

const client = new net.Socket();
const packetHandler = new QueueAdaptor(rabbitConnectionString, rabbitQueue);

const feedHandler = new FeedHandler(packetHandler);

client.connect(8282, 'localhost', async () =>  {
    console.log('Connected to localhost:8282');
    // await packetHandler.connect(connectionString);
    // console.log('Connected to :' + connectionString); 
});

client.on('data', function(data) {
    // console.log('Received: ' + data);
    feedHandler.handle(data.toString());
});

client.on('close', function() {
    console.log('Connection closed');
});