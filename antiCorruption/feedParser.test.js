import test from 'ava';
import parser from './feedParser';

test('create packet success', t => {
    // arrange
    const input = '|2049|create|packet|1500560941381|XYZ|';
    // act
    const packet = parser.parse(input);
    // assert
    t.is(packet.msgId, '2049', 'packet.msgId invalid');
    t.is(packet.operation, 'create', 'packet.operation invalid');
    t.is(packet.type, 'packet', 'packet.type invalid');
    t.is(packet.timestamp.getTime(), new Date(1500560941381).getTime(), 'packet.timestamp invalid');
    t.truthy(packet.body, 'packet.body invalid');
});

test('create event success', t => {
    // arrange
    const input = '|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|';
    // act
    const packet = parser.parse(input);
    // assert
    t.is(packet.msgId, '2049', 'event.msgId invalid');
    t.is(packet.operation, 'create', 'event.operation invalid');
    t.is(packet.type, 'event', 'event.type invalid');
    t.is(packet.timestamp.getTime(), new Date(1500560941381).getTime(), 'event.timestamp invalid');
    t.is(packet.eventId, 'f5e8fcd3-8f20-40b3-826e-f97bf95f1423', 'event.eventId is invalid');
    t.is(packet.category, 'Football', 'event.category is invalid');
    t.is(packet.subCategory, 'Premier League', 'event.subCategory is invalid');
    t.is(packet.name, '\\|Manchester Utd\\| vs \\|Manchester City\\|', 'event.name is invalid');
    t.is(packet.startTime.getTime(), new Date(1500560978604).getTime(), 'event.startTime is invalid');
    t.is(packet.displayed, false, 'event.displayed is invalid');
    t.is(packet.suspended, true, 'event.suspended is invalid');
});

test('create market success', t => {
    // arrange
    const input = '|2142|create|market|1500568077109|f3bdb437-3fbe-488c-b962-28fcac066efe|f4ac93ff-8412-4a0b-8eb2-7ddb852f914e|Both Teams To Score|0|1|';
    // act
    const packet = parser.parse(input);
    // assert    
    t.is(packet.msgId, '2142', 'market.msgId invalid');
    t.is(packet.operation, 'create', 'market.operation invalid');
    t.is(packet.type, 'market', 'market.type invalid');
    t.is(packet.timestamp.getTime(), new Date(1500568077109).getTime(), 'market.timestamp invalid');
    t.is(packet.eventId, 'f3bdb437-3fbe-488c-b962-28fcac066efe', 'market.eventId is invalid');
    t.is(packet.marketId, 'f4ac93ff-8412-4a0b-8eb2-7ddb852f914e', 'market.marketId is invalid');
    t.is(packet.name, 'Both Teams To Score', 'market.name is invalid');
    t.is(packet.displayed, false, 'market.displayed is invalid');
    t.is(packet.suspended, true, 'market.suspended is invalid');
});