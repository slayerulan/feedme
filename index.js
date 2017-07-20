/* eslint no-console:0 */

import net from 'net';
import feedHandler from './src/feedHandler';

const client = new net.Socket();
client.connect(8282, 'localhost', function() {
    console.log('Connected to localhost:8282');
});

client.on('data', function(data) {
    const parsedData = feedHandler.handle(data.toString());
    console.log(JSON.stringify(parsedData));
});

client.on('close', function() {
    console.log('Connection closed');
});