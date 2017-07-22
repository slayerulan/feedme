import test from 'ava';
import sinon from 'sinon';
import FeedHandler from './feedHandler';

const MockPacketHandler = class {
    constructor() {
        this.enqueue = sinon.spy();
    }
};

test('can handle single line', t => {
    // arrange
    const input = '|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|';
    const mockPacketHandler = new MockPacketHandler();
    const handler = new FeedHandler(mockPacketHandler);
    // act
    const result = handler.handle(input).successful;
    // assert
    t.is(result.length, 1, 'incorrect number of results');
    t.is(result[0].msgId, 2049, `expected 2049 but found ${result[0].msgId}`);
    t.is(mockPacketHandler.enqueue.callCount, 1);
});


test('can handle multiple lines', t => {
    // arrange
    const input = `|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
|2048|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1422|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
|2047|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1421|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|`;
    const mockPacketHandler = new MockPacketHandler();
    const handler = new FeedHandler(mockPacketHandler);
    // act
    const result = handler.handle(input).successful;
    // assert
    t.is(result.length, 3, 'incorrect number of results');
    t.is(result[0].msgId, 2049, 'incorrect eventId on result[0]');
    t.is(result[1].msgId, 2048, 'incorrect eventId on result[1]');
    t.is(result[2].msgId, 2047, 'incorrect eventId on result[2]'); 
    t.is(mockPacketHandler.enqueue.callCount, 1);
});

test('can handle trailing newline', t => {
    // arrange
    const input = `|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
`;
    const mockPacketHandler = new MockPacketHandler();
    const handler = new FeedHandler(mockPacketHandler);
    // act
    const result = handler.handle(input).successful;
    // assert
    t.is(result.length, 1, 'incorrect number of results');
    t.is(result[0].msgId, 2049, 'incorrect eventId on result[0]');
    t.is(mockPacketHandler.enqueue.callCount, 1);
});

test('invalid lines don\'t prevent other lines from processing', t => {
    // arrange
    const input = `|2049|create|event|15005609413
|2050|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
`;
    const mockPacketHandler = new MockPacketHandler();
    const handler = new FeedHandler(mockPacketHandler);
    // act
    const result = handler.handle(input);
    //assert
    t.is(result.successful.length, 1, 'incorrect number of successful results');
    t.is(result.failed.length, 1, 'incorrect number of failed results');
    t.is(result.successful[0].msgId, 2050, 'incorrect eventId on result[0]');
    t.is(result.failed[0].line, '|2049|create|event|15005609413', 'incorrect eventId on result[0]');
    t.is(result.failed[0].message, 'invalid format: expected startTime to be an integer but found "undefined"', 'incorrect eventId on result[0]');
    t.is(mockPacketHandler.enqueue.callCount, 1);
});