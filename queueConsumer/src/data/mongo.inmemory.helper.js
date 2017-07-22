import test from 'ava';
import mongoose from 'mongoose';
import { MongoDBServer } from 'mongomem';

const configure = function() {

    test.before('start server', async (debug) => {
        MongoDBServer.debug = debug;
        await MongoDBServer.start();
    });

    const setupMongoose = async () => {
        const cs = await MongoDBServer.getConnectionString();
        mongoose.Promise = require('bluebird');
        await mongoose.connect(cs, {useMongoClient: true});
        return mongoose;
    };

    test.beforeEach(async t => {
        const db = await setupMongoose();
        t.context.db = db;
    });

    test.afterEach.always(async t => {
        const { db } = t.context;
        await db.connection.close();
    });

    test.after.always('cleanup', async () => await MongoDBServer.tearDown());
};

export default {
    configure
};