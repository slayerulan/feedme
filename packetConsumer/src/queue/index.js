const amqp = require('amqplib/callback_api');

const RabbitAdaptor = class {
    constructor(connectionString, queue) {
        this.connectionString = connectionString;
        this.queue = queue;
        this.connected = false;
        this.enqueue = (data, queue) => { this._enqueue(this.connectionString, queue || this.queue, data); };
        this.testConnection = () => { return this._testConnection(connectionString); };
    }

    _testConnection(connectionString) {
        if (this.connected) return true;
        amqp.connect(connectionString, async (err) => {
            if (err) {
                console.log(`Failed to connect to ${connectionString}. Retrying...`); // eslint-disable-line no-console                                
            }
            else {
                console.log(`Connection established with ${connectionString}.`); // eslint-disable-line no-console                                                
                this.connected = true;
            }
        });
    }
    
    _enqueue(connectionString, queue, data) {
        amqp.connect(connectionString, (err, conn) => {
            if (err) {
                setTimeout(() => {
                    this._enqueue(connectionString, queue, data);
                }, 5000);
            }
            else {
                conn.createChannel(function(err, ch) {
                    if (err) {
                        throw err;
                    }
                    ch.assertQueue(queue, { durable: true });
                    data.forEach(function(packet) {
                        ch.sendToQueue(queue, new Buffer.from(JSON.stringify(packet)));
                    }, this);
                });

                setTimeout(() => {
                    conn.close();
                }, 500);
            }
        });
    }
};

export default RabbitAdaptor;