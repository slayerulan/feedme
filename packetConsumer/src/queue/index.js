const amqp = require('amqplib/callback_api');

const RabbitAdaptor = class {
    constructor(connectionString, queue) {
        this.connectionString = connectionString;
        this.queue = queue;
        this.enqueue = (data, queue) => { this._enqueue(this.connectionString, queue || this.queue, data); };
    }
    
    _enqueue(connectionString, queue, data) {
        amqp.connect(connectionString, (err, conn) => {
            if (err) {
                throw err;
            }

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
        });
    }
};

export default RabbitAdaptor;