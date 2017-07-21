import test from 'ava';
import mongoose from 'mongoose';
import { MongoDBServer } from 'mongomem';

import mongoAdaptor from './mongoAdaptor';
import Fixture from './models/fixtureSchema';

test.before('start server', async () => {
    MongoDBServer.debug = true;
    await MongoDBServer.start();
});

const setupMongoose = async () => {
    const cs = await MongoDBServer.getConnectionString();
    // return await mongoAdaptor.connect(cs);
    await mongoose.connect(cs);
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

test.serial('db existis', (t) => {
    t.truthy(true);
});

test.serial('save fixture success (integration test)', async (t) => {
    // arrange
    const fixture = {
        msgId: 2049,
        operation: 'create',
        type: 'event',
        timestamp: 1500560941381,
        eventId: 'f5e8fcd3-8f20-40b3-826e-f97bf95f1423', 
        category: 'Football', 
        subCategory: 'Premier League', 
        name: '\\|Manchester Utd\\| vs \\|Manchester City\\|', 
        startTime: 1500560978604, 
        displayed: false, 
        suspended: true
    };
    // act
    await mongoAdaptor.create(fixture);
    // assert
    await Fixture.count({}, (err, count) => {
        if (err) t.fail(err.message);
        t.is(count, 1, 'incorrect number of records in mongo');        
    });
});

test.serial('update fixture success (integration test)', async (t) => {
    // arrange
    const fixture = {
        msgId: 2049,
        operation: 'create',
        type: 'event',
        timestamp: 1500560941381,
        eventId: 'f5e8fcd3-8f20-40b3-826e-f97bf95f1423', 
        category: 'Football', 
        subCategory: 'Premier League', 
        name: '\\|Manchester Utd\\| vs \\|Manchester City\\|', 
        startTime: 1500560978604, 
        displayed: false, 
        suspended: true
    };
    await mongoAdaptor.create(fixture);
    // act
    fixture.name = '\\|Manchester City\\| vs \\|Manchester Utd\\|';
    await mongoAdaptor.update(fixture);
    // assert
    await Fixture.count({}, (err, count) => {
        if (err) t.fail(err.message);
        t.is(count, 1, 'incorrect number of records in mongo');        
    });
    await Fixture.findOne({'eventId': fixture.eventId}, (err, model) => {
        t.is(model.name, '\\|Manchester City\\| vs \\|Manchester Utd\\|');
    });
});

test.after.always('cleanup', () => MongoDBServer.tearDown());
