/* eslint no-console:0 */

const amqp = require('amqplib/callback_api');

const RabbitAdaptor = {
    subscribe: async (connectionString, queue, messageHandler) => {
        console.log('begin');
        await amqp.connect(connectionString, (err, conn) => {
            conn.createChannel((err, ch) => {
                ch.assertQueue(queue, { exclusive: false }, (err, q) => {
                    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q.queue);
                    // ch.bindQueue(q.queue, queue, 'fixture-*');

                    ch.consume(q.queue, (message) => {
                        console.log(' [x] %s', message.content.toString());
                        messageHandler.handle(JSON.parse(message.content));
                    }, {noAck: true});
                });
            });
        });
        console.log('end');        
    }
};

export default RabbitAdaptor;