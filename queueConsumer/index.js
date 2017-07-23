import RabbitAdaptor from './src/queue/RabbitAdaptor';
import MessageHandler from './src/queue/messageHandler';
import FailureHandler from './src/queue/failureHandler';
import DataAdaptor from './src/data';

const rabbitConnectionsString = 'amqp://rabbitmq:rabbitmq@localhost:5672//feedme';
const mongoConnectionString = 'mongodb://localhost:27017/feedme'; 
const queue = 'feedme.all';
const failureQueue = 'feedme.failed';
const dataAdaptor = new DataAdaptor();
const messageHandler = new MessageHandler(dataAdaptor);
const failureHandler = new FailureHandler(dataAdaptor);

dataAdaptor.connect(mongoConnectionString);

RabbitAdaptor.subscribe(rabbitConnectionsString, queue, messageHandler);
RabbitAdaptor.subscribe(rabbitConnectionsString, failureQueue, failureHandler);