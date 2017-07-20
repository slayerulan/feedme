import test from 'ava';
import handler from './feedHandler';

test('can handle single line', t => {
    // arrange
    const input = '|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|';
    // act
    const result = handler.handle(input);
    // assert
    t.is(result.length, 1, 'incorrect number of results');
    t.is(result[0].msgId, 2049, 'incorrect eventId on result[0]');  
});

test('can handle multipe lines', t => {
    // arrange
    const input = `|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
|2142|create|market|1500568077109|f3bdb437-3fbe-488c-b962-28fcac066efe|f4ac93ff-8412-4a0b-8eb2-7ddb852f914e|Both Teams To Score|0|1|
|5257|create|outcome|1500568619618|86397183-528f-434e-b7ff-c237dd2107a6|05efca1f-dc68-4bc5-aec0-1e6bf5189c12|\\|Roger Federer\\| 3-1|10/3|1|0|`;
    // act
    const result = handler.handle(input);
    // assert
    t.is(result.length, 3, 'incorrect number of results');
    t.is(result[0].msgId, 2049, 'incorrect eventId on result[0]');
    t.is(result[1].msgId, 2142, 'incorrect eventId on result[1]');
    t.is(result[2].msgId, 5257, 'incorrect eventId on result[2]');    
});

test('can handle trailing newline', t => {
    // arrange
    const input = `|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
`;
    // act
    const result = handler.handle(input);
    // assert
    t.is(result.length, 1, 'incorrect number of results');
    t.is(result[0].msgId, 2049, 'incorrect eventId on result[0]');    
});