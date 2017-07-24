/* eslint no-console:0 */

const amqp = require('amqplib/callback_api');

const RabbitAdaptor = {
    subscribe: async (connectionString, queue, messageHandler) => {
        await amqp.connect(connectionString, (err, conn) => {
            if (err) {
                setTimeout(() => {
                    RabbitAdaptor.subscribe(connectionString, queue, messageHandler);     
                }, 1000);
                console.log(`Failed to connect to ${connectionString}. Retrying...`); // eslint-disable-line no-console                
            }
            else {
                conn.createChannel((err, ch) => {
                    ch.assertQueue(queue, { exclusive: false }, (err, q) => {
                        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q.queue);

                        ch.consume(q.queue, (message) => {
                            messageHandler.handle(JSON.parse(message.content));
                        }, {noAck: true});
                    });
                });
            }
        });
    }
};

export default RabbitAdaptor;