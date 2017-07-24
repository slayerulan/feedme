import mongoose from 'mongoose';

export const connect = (mongoURL) => {
    // Set native promises as mongoose promise
    mongoose.Promise = require('bluebird');
    mongoose.connect(mongoURL, { useMongoClient: true }, (error) => {
        if (error) {
            console.error(`Failed to connect to ${mongoURL}. Retrying...`); // eslint-disable-line no-console
            connect(mongoURL);
        }
    });
};

