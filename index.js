import net from 'net';

const client = new net.Socket();
client.connect(8282, 'localhost', function() {
    console.log('Connected to localhost:8282');
});

client.on('data', function(data) {
    console.log('Received: ' + data);
});

client.on('close', function() {
    console.log('Connection closed');
});