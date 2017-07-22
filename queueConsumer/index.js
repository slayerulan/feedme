import RabbitAdaptor from './src/queue/RabbitAdaptor';
import MessageHandler from './src/queue/messageHandler';
import DataAdaptor from './src/data';

const rabbitConnectionsString = 'amqp://rabbitmq:rabbitmq@localhost:5672//feedme';
const mongoConnectionString = 'mongodb://localhost:27017/feedme'; 
const queue = 'feedme.all';
const dataAdaptor = new DataAdaptor();
const messageHandler = new MessageHandler(dataAdaptor);

dataAdaptor.connect(mongoConnectionString);

RabbitAdaptor.subscribe(rabbitConnectionsString, queue, messageHandler);