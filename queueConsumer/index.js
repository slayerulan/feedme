import RabbitAdaptor from './src/queue/RabbitAdaptor';
import MessageHandler from './src/queue/messageHandler';
import FailureHandler from './src/queue/failureHandler';
import DataAdaptor from './src/data';

const rabbitConnectionsString = process.env.RABBIT_URL || 'amqp://rabbitmq:rabbitmq@localhost:5672//feedme';
const mongoConnectionString = process.env.MONGO_URL || 'mongodb://localhost:27017/feedme'; 
const queue = process.env.RABBIT_QUEUE || 'feedme.all';
const failureQueue = process.env.RABBIT_QUEUE_FAILURES || 'feedme.failed';
const dataAdaptor = new DataAdaptor();
const messageHandler = new MessageHandler(dataAdaptor);
const failureHandler = new FailureHandler(dataAdaptor);

dataAdaptor.connect(mongoConnectionString);

RabbitAdaptor.subscribe(rabbitConnectionsString, queue, messageHandler);
RabbitAdaptor.subscribe(rabbitConnectionsString, failureQueue, failureHandler);