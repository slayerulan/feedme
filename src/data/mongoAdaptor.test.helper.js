import test from 'ava';
import mongoose from 'mongoose';
import { MongoDBServer } from 'mongomem';
import Fixture from './models/fixtureSchema';

test.before('start server', async () => {
    // MongoDBServer.debug = true;
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

// test.after.always('cleanup', () => MongoDBServer.tearDown());


const createTestFixture = async (eventId) => {
    const fixture = new Fixture({
        eventId, 
        category: 'Football', 
        subCategory: 'Premier League', 
        name: '\\|Manchester Utd\\| vs \\|Manchester City\\|', 
        startTime: 1500560978604, 
        displayed: false, 
        suspended: true
    });
    await fixture.save((err) => {
        if(err) throw err;
    });
};

const createTestMarket = async (eventId, marketId) => {
    await Fixture.update(
        { eventId },
        { $push: {
            markets: {  
                marketId,
                name: 'Both Teams To Score',
                displayed: true, 
                suspended: false,
                outcomes: []
            }
        }});
};

export default {
    createTestFixture,
    createTestMarket
};