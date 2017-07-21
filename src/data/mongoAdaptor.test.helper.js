import test from 'ava';
import mongoose from 'mongoose';
import { MongoDBServer } from 'mongomem';

test.before('start server', async () => {
    // MongoDBServer.debug = true;
    await MongoDBServer.start();
});

const setupMongoose = async () => {
    const cs = await MongoDBServer.getConnectionString();
    // return await mongoAdaptor.connect(cs);
    mongoose.Promise = global.Promise;
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

test.after.always('cleanup', () => MongoDBServer.tearDown());