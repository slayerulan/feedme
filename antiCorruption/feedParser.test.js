import test from 'ava';
import parser from './feedParser';

test('create event success', t => {
    // arrange
    const input = '|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|';
    // act
    const event = parser.parse(input);
    // assert
    t.is(event.msgId, 2049, 'event.msgId invalid');
    t.is(event.operation, 'create', 'event.operation invalid');
    t.is(event.type, 'event', 'event.type invalid');
    t.is(event.timestamp, 1500560941381, 'event.timestamp invalid');
    t.is(event.eventId, 'f5e8fcd3-8f20-40b3-826e-f97bf95f1423', 'event.eventId is invalid');
    t.is(event.category, 'Football', 'event.category is invalid');
    t.is(event.subCategory, 'Premier League', 'event.subCategory is invalid');
    t.is(event.name, '\\|Manchester Utd\\| vs \\|Manchester City\\|', 'event.name is invalid');
    t.is(event.startTime, 1500560978604, 'event.startTime is invalid');
    t.is(event.displayed, false, 'event.displayed is invalid');
    t.is(event.suspended, true, 'event.suspended is invalid');
});

test('create market success', t => {
    // arrange
    const input = '|2142|create|market|1500568077109|f3bdb437-3fbe-488c-b962-28fcac066efe|f4ac93ff-8412-4a0b-8eb2-7ddb852f914e|Both Teams To Score|0|1|';
    // act
    const market = parser.parse(input);
    // assert    
    t.is(market.msgId, 2142, 'market.msgId invalid');
    t.is(market.operation, 'create', 'market.operation invalid');
    t.is(market.type, 'market', 'market.type invalid');
    t.is(market.timestamp, 1500568077109, 'market.timestamp invalid');
    t.is(market.eventId, 'f3bdb437-3fbe-488c-b962-28fcac066efe', 'market.eventId is invalid');
    t.is(market.marketId, 'f4ac93ff-8412-4a0b-8eb2-7ddb852f914e', 'market.marketId is invalid');
    t.is(market.name, 'Both Teams To Score', 'market.name is invalid');
    t.is(market.displayed, false, 'market.displayed is invalid');
    t.is(market.suspended, true, 'market.suspended is invalid');
});

test('create outcome success', t => {
    // arrange
    const input = '|5257|create|outcome|1500568619618|86397183-528f-434e-b7ff-c237dd2107a6|05efca1f-dc68-4bc5-aec0-1e6bf5189c12|\\|Roger Federer\\| 3-1|10/3|1|0|';
    // act
    const outcome = parser.parse(input);
    // assert    
    t.is(outcome.msgId, 5257, 'outcome.msgId invalid');
    t.is(outcome.operation, 'create', 'outcome.operation invalid');
    t.is(outcome.type, 'outcome', 'outcome.type invalid');
    t.is(outcome.timestamp, 1500568619618, 'outcome.timestamp invalid');
    t.is(outcome.marketId, '86397183-528f-434e-b7ff-c237dd2107a6', 'outcome.marketId is invalid');
    t.is(outcome.outcomeId, '05efca1f-dc68-4bc5-aec0-1e6bf5189c12', 'outcome.outcomeId is invalid');
    t.is(outcome.name, '\\|Roger Federer\\| 3-1', 'outcome.name is invalid');
    t.is(outcome.price, '10/3', 'outcome.price is invalid');
    t.is(outcome.displayed, true, 'outcome.displayed is invalid');
    t.is(outcome.suspended, false, 'outcome.suspended is invalid');
});

test('unknown packet throws error', t => {
    // arrange
    const input = '|2049|create|fail|1500560941381|XYZ|';
    // assert
    const error = t.throws(() => {
        parser.parse(input);
    });
    t.is(error.message, 'unexpected packet of type fail found');
});