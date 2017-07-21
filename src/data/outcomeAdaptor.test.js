import test from 'ava';
import helpers from './mongoAdaptor.test.helper';

import outcomeAdaptor from './outcomeAdaptor';

test.serial('create outcome success (integration test)', async (t) => {
    // arrange
    const eventId = 'f3bdb437-3fbe-488c-b962-28fcac066efe';
    const marketId = 'f4ac93ff-8412-4a0b-8eb2-7ddb852f914e';
    const outcome = getTestOutcome(marketId, '05efca1f-dc68-4bc5-aec0-1e6bf5189c12');
    await helpers.createTestFixture(eventId);
    await helpers.createTestMarket(eventId, marketId);
    // act

    await outcomeAdaptor.create(outcome);
    // assert

    await t.context.db.models.Fixture.findOne({ 'eventId': eventId }, (err, model) => {
        if (err) t.fail(err.message);
        t.is(model.markets.length, 1, 'incorrect number of markets in mongo');
        t.is(model.markets[0].outcomes.length, 1, 'incorrect number of outcomes in mongo');
        t.is(model.markets[0].outcomes[0].outcomeId, outcome.outcomeId);     
    });
});

test.serial('update outcome success (integration test)', async (t) => {
    // arrange
    const eventId = 'f3bdb437-3fbe-488c-b962-28fcac066efe';
    const marketId = 'f4ac93ff-8412-4a0b-8eb2-7ddb852f914e';
    const outcome = getTestOutcome(marketId, '05efca1f-dc68-4bc5-aec0-1e6bf5189c12');
    await helpers.createTestFixture(eventId);
    await helpers.createTestMarket(eventId, marketId);
    await outcomeAdaptor.create(outcome);
    // act
    outcome.suspended = true;
    await outcomeAdaptor.update(outcome);
    // assert
    await t.context.db.models.Fixture.findOne({ 'eventId': eventId }, (err, model) => {
        if (err) t.fail(err.message);
        t.is(model.markets.length, 1, 'incorrect number of markets in mongo');
        t.is(model.markets[0].outcomes.length, 1, 'incorrect number of outcomes in mongo');
        t.is(model.markets[0].outcomes[0].suspended, true, 'outcome has not been updated');
    });
});

test.serial('update outcome doesn\'t update other outcomes (integration test)', async (t) => {
    // arrange
    const eventId = 'f3bdb437-3fbe-488c-b962-28fcac066efe';
    const marketId = 'f4ac93ff-8412-4a0b-8eb2-7ddb852f914e';    
    const outcome = getTestOutcome(marketId, '05efca1f-dc68-4bc5-aec0-1e6bf5189c10');
    const outcome2 = getTestOutcome(marketId, '05efca1f-dc68-4bc5-aec0-1e6bf5189c11');
    await helpers.createTestFixture(eventId);
    await helpers.createTestMarket(eventId, marketId);
    await outcomeAdaptor.create(outcome);
    await outcomeAdaptor.create(outcome2);
    // act
    outcome2.suspended = true;
    await outcomeAdaptor.update(outcome2);
    // assert
    await t.context.db.models.Fixture.findOne({ 'eventId': eventId }, (err, model) => {
        if (err) t.fail(err.message);
        t.is(model.markets.length, 1, 'incorrect number of markets in mongo');
        t.is(model.markets[0].outcomes.length, 2, 'incorrect number of outcomes in mongo');
        t.is(model.markets[0].outcomes[0].outcomeId, '05efca1f-dc68-4bc5-aec0-1e6bf5189c10', 'outcomes are in the incorrect order');
        t.is(model.markets[0].outcomes[0].suspended, false, 'outcome has been updated');
        t.is(model.markets[0].outcomes[1].outcomeId, '05efca1f-dc68-4bc5-aec0-1e6bf5189c11', 'outcomes are in the incorrect order');
        t.is(model.markets[0].outcomes[1].suspended, true, 'outcome has not been updated');
    });
});



test.serial('update outcome doesn\'t update other markets (integration test)', async (t) => {
    // arrange
    const eventId = 'f3bdb437-3fbe-488c-b962-28fcac066efe';
    await helpers.createTestFixture(eventId);

    const marketId = 'f4ac93ff-8412-4a0b-8eb2-7ddb852f914e';
    await helpers.createTestMarket(eventId, marketId);
    const outcome = getTestOutcome(marketId, '05efca1f-dc68-4bc5-aec0-1e6bf5189c12');
    await outcomeAdaptor.create(outcome);

    const marketId2 = 'f4ac93ff-8412-4a0b-8eb2-7ddb852f914f';
    const outcome2 = getTestOutcome(marketId2, '05efca1f-dc68-4bc5-aec0-1e6bf5189c13');
    await helpers.createTestMarket(eventId, marketId2);
    await outcomeAdaptor.create(outcome2);
    
    // act
    outcome2.suspended = true;
    await outcomeAdaptor.update(outcome2);
    // assert
    await t.context.db.models.Fixture.findOne({ 'eventId': eventId }, (err, model) => {
        if (err) t.fail(err.message);
        t.is(model.markets.length, 2, 'incorrect number of markets in mongo');
        t.is(model.markets[0].outcomes.length, 1, 'incorrect number of outcomes in mongo');
        t.is(model.markets[1].outcomes.length, 1, 'incorrect number of outcomes in mongo');
        t.is(model.markets[0].outcomes[0].outcomeId, '05efca1f-dc68-4bc5-aec0-1e6bf5189c12', 'outcomes are in the incorrect order');
        t.is(model.markets[0].outcomes[0].suspended, false, 'outcome has been updated');
        t.is(model.markets[1].outcomes[0].outcomeId, '05efca1f-dc68-4bc5-aec0-1e6bf5189c13', 'outcomes are in the incorrect order');
        t.is(model.markets[1].outcomes[0].suspended, true, 'outcome has not been updated');
    });
});

const getTestOutcome = (marketId, outcomeId) => {
    return {
        msgId: 2142,
        operation: 'create',
        type: 'market',
        timestamp: 1500568077109,
        marketId, 
        outcomeId, 
        name: '\\|Roger Federer\\| 3-1',
        price: '10/3',
        displayed: true, 
        suspended: false
    };
};