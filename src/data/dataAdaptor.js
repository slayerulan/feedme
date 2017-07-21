import mongoose from 'mongoose';

import fixtureAdaptor from './fixtureAdaptor';
import marketAdaptor from './marketAdaptor';
import outcomeAdaptor from './outcomeAdaptor';


const connect = async (connectionString) => {
    mongoose.Promise = require('bluebird');
    mongoose.connection.on('error',function (err) {  
        console.log('Mongoose default connection error: ' + err);
    });
    await mongoose.connect(connectionString, {useMongoClient: true});


};

export default {
    fixture: fixtureAdaptor,
    market: marketAdaptor,
    outcome: outcomeAdaptor,
    connect
};