import test from 'ava';
import sinon from 'sinon';
import MessageHandler from './messageHandler';

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

test('correctly routes create event line', t => {
    // arrange
    const input = getTestMessage('event', 'create');
    mockPacketHandler.fixture.create = sinon.spy();
    const handler = new MessageHandler(Object.assign({}, mockPacketHandler));
    // act
    handler.handle(input);
    // assert
    t.is(mockPacketHandler.fixture.create.callCount, 1, `expected packetHandler.fixture.create to be called once but it was called ${mockPacketHandler.fixture.create.callCount} times`);
});

test('correctly routes update event line', t => {
    // arrange
    const input = getTestMessage('event', 'update');
    const handler = new MessageHandler(Object.assign({}, mockPacketHandler));  
    // act
    handler.handle(input);
    // assert
    t.is(mockPacketHandler.fixture.update.callCount, 1, `expected packetHandler.fixture.update to be called once but it was called ${mockPacketHandler.fixture.update.callCount} times`);
});

test('correctly routes create market line', t => {
    // arrange
    const input = getTestMessage('market', 'create');
    const handler = new MessageHandler(Object.assign({}, mockPacketHandler));
    // act
    handler.handle(input);
    // assert
    t.is(mockPacketHandler.market.create.callCount, 1, `expected packetHandler.market.create to be called once but it was called ${mockPacketHandler.market.create.callCount} times`);
});

test('correctly routes update market line', t => {
    // arrange
    const input = getTestMessage('market', 'update');
    const handler = new MessageHandler(Object.assign({}, mockPacketHandler));
    // act
    handler.handle(input);
    // assert
    t.is(mockPacketHandler.market.update.callCount, 1, `expected packetHandler.market.update to be called once but it was called ${mockPacketHandler.market.update.callCount} times`);
});

test('correctly routes create outcome line', t => {
    // arrange
    const input = getTestMessage('outcome', 'create');
    const handler = new MessageHandler(Object.assign({}, mockPacketHandler));
    // act
    handler.handle(input);
    // assert
    t.is(mockPacketHandler.outcome.create.callCount, 1, `expected packetHandler.outcome.create to be called once but it was called ${mockPacketHandler.outcome.create.callCount} times`);
});

test('correctly routes update outcome line', t => {
    // arrange
    const input = getTestMessage('outcome', 'update');
    const handler = new MessageHandler(Object.assign({}, mockPacketHandler));
    // act
    handler.handle(input);
    // assert
    t.is(mockPacketHandler.outcome.update.callCount, 1, `expected packetHandler.outcome.update to be called once but it was called ${mockPacketHandler.outcome.update.callCount} times`);
});

test('calling handle with an invalid type throws an error', t => {
    // arrange
    const input = getTestMessage('invalid', 'update');
    const handler = new MessageHandler(Object.assign({}, mockPacketHandler));
    // act
    const error = t.throws(() => {
        handler.handle(input);
    });
    t.is(error.message, 'invalid message type: invalid');
});

test('calling handle with an invalid operation throws an error', t => {
    // arrange
    const input = getTestMessage('event', 'invalid');
    const handler = new MessageHandler(Object.assign({}, mockPacketHandler));
    // act
    const error = t.throws(() => {
        handler.handle(input);
    });
    t.is(error.message, 'invalid operation: expected create or update but found "invalid"');
});

test('calling handle without providing a packet handler throws an error', t => {
    //arrange
    const handler = new MessageHandler();
    //act
    const error = t.throws(() => {
        handler.handle('fail');
    });
    t.is(error.message, 'a data handler must be supplied to perform this operation');
});

const getTestMessage = (type, operation) => {
    return {
        msgId: '2049',
        operation,
        type,
        timestamp: '1500560941381',
        data: 'xyz'
    };
};