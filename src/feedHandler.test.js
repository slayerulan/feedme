import test from 'ava';
import sinon from 'sinon';
import FeedHandler from './feedHandler';

const mockPacketHandler = {
    fixture: {
        create: sinon.spy(),
        update: sinon.spy()
    },
    market: {
        create: sinon.spy(),
        update: sinon.spy()
    },
    outcome: {
        create: sinon.spy(),
        update: sinon.spy()
    }
};

test('can handle single line', t => {
    // arrange
    const input = '|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|';
    const handler = new FeedHandler(Object.assign({}, mockPacketHandler));
    // act
    const result = handler.handle(input).successful;
    // assert
    t.is(result.length, 1, 'incorrect number of results');
    t.is(result[0].msgId, 2049, `expected 2049 but found ${result[0].msgId}`);
});


test('can handle multiple lines', t => {
    // arrange
    const input = `|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
|2048|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1422|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
|2047|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1421|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|`;
    const handler = new FeedHandler(Object.assign({}, mockPacketHandler));
    // act
    const result = handler.handle(input).successful;
    // assert
    t.is(result.length, 3, 'incorrect number of results');
    t.is(result[0].msgId, 2049, 'incorrect eventId on result[0]');
    t.is(result[1].msgId, 2048, 'incorrect eventId on result[1]');
    t.is(result[2].msgId, 2047, 'incorrect eventId on result[2]'); 
});

test('can handle trailing newline', t => {
    // arrange
    const input = `|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
`;
    const handler = new FeedHandler(Object.assign({}, mockPacketHandler));
    // act
    const result = handler.handle(input).successful;
    // assert
    t.is(result.length, 1, 'incorrect number of results');
    t.is(result[0].msgId, 2049, 'incorrect eventId on result[0]');
});

test('invalid lines don\'t prevent other lines from processing', t => {
    // arrange
    const input = `|2049|create|event|15005609413
|2050|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
`;
    const handler = new FeedHandler(Object.assign({}, mockPacketHandler));
    // act
    const result = handler.handle(input);
    //assert
    t.is(result.successful.length, 1, 'incorrect number of successful results');
    t.is(result.failed.length, 1, 'incorrect number of failed results');
    t.is(result.successful[0].msgId, 2050, 'incorrect eventId on result[0]');
    t.is(result.failed[0].line, '|2049|create|event|15005609413', 'incorrect eventId on result[0]');
    t.is(result.failed[0].message, 'invalid format: expected startTime to be an integer but found "undefined"', 'incorrect eventId on result[0]');
});

test('correctly routes create event line', t => {
    // arrange
    const input = '|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|';
    mockPacketHandler.fixture.create = sinon.spy();
    const handler = new FeedHandler(Object.assign({}, mockPacketHandler));
    // act
    handler.handle(input);
    // assert
    t.is(mockPacketHandler.fixture.create.callCount, 1, `expected packetHandler.fixture.create to be called once but it was called ${mockPacketHandler.fixture.create.callCount} times`);
});

test('correctly routes update event line', t => {
    // arrange
    const input = '|2049|update|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|';
    const handler = new FeedHandler(Object.assign({}, mockPacketHandler));  
    // act
    handler.handle(input);
    // assert
    t.is(mockPacketHandler.fixture.update.callCount, 1, `expected packetHandler.fixture.update to be called once but it was called ${mockPacketHandler.fixture.update.callCount} times`);
});

test('correctly routes create market line', t => {
    // arrange
    const input = '|2049|create|market|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|data';
    const handler = new FeedHandler(Object.assign({}, mockPacketHandler));
    // act
    handler.handle(input);
    // assert
    t.is(mockPacketHandler.market.create.callCount, 1, `expected packetHandler.market.create to be called once but it was called ${mockPacketHandler.market.create.callCount} times`);
});

test('correctly routes update market line', t => {
    // arrange
    const input = '|2049|update|market|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|data|';
    const handler = new FeedHandler(Object.assign({}, mockPacketHandler));
    // act
    handler.handle(input);
    // assert
    t.is(mockPacketHandler.market.update.callCount, 1, `expected packetHandler.market.update to be called once but it was called ${mockPacketHandler.market.update.callCount} times`);
});

test('correctly routes create outcome line', t => {
    // arrange
    const input = '|2049|create|outcome|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|data';
    const handler = new FeedHandler(Object.assign({}, mockPacketHandler));
    // act
    handler.handle(input);
    // assert
    t.is(mockPacketHandler.outcome.create.callCount, 1, `expected packetHandler.outcome.create to be called once but it was called ${mockPacketHandler.outcome.create.callCount} times`);
});

test('correctly routes update outcome line', t => {
    // arrange
    const input = '|2049|update|outcome|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|data|';
    const handler = new FeedHandler(Object.assign({}, mockPacketHandler));
    // act
    handler.handle(input);
    // assert
    t.is(mockPacketHandler.outcome.update.callCount, 1, `expected packetHandler.outcome.update to be called once but it was called ${mockPacketHandler.outcome.update.callCount} times`);
});

test('calling handle without providing a packet handler throws an error', t => {
    //arrange
    const handler = new FeedHandler();
    //act
    const error = t.throws(() => {
        handler.handle('fail');
    });
    t.is(error.message, 'a packet handler must be supplied to perform this operation');
});