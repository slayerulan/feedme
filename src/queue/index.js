const amqp = require('amqplib/callback_api');

const RabbitAdaptor = class {
    constructor(connectionString, queue) {
        this.connectionString = connectionString;
        this.queue = queue;

        this.fixture = {
            create: (data) => { this.enqueue(this.connectionString, this.queue, data, 'createFixture'); },
            update: (data) => { this.enqueue(this.connectionString, this.queue, data, 'updateFixture'); }
        };
        this.market = {
            create: (data) => { this.enqueue(this.connectionString, this.queue, data, 'createMarket'); },
            update: (data) => { this.enqueue(this.connectionString, this.queue, data, 'updateMarket'); }
        };
        this.outcome = {
            create: (data) => { this.enqueue(this.connectionString, this.queue, data, 'createOutcome'); },
            update: (data) => { this.enqueue(this.connectionString, this.queue, data, 'updateOutcome'); }
        };
    }
    
    enqueue(connectionString, queue, data, messageName) {
        amqp.connect(connectionString, (err, conn) => {
            if (err) {
                throw err;
            }

            conn.createChannel(function(err, ch) {
                if (err) {
                    throw err;
                }
                ch.assertQueue(queue, { durable: true });
                ch.sendToQueue(queue, new Buffer.from(JSON.stringify(data), { header: { messageName }}));
            });

            setTimeout(() => {
                conn.close();
            }, 500);
        });
    }
};

export default RabbitAdaptor;