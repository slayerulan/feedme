import test from 'ava';
import handler from './feedHandler';

test.serial('can handle single line', t => {
    // arrange
    const input = '|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|';
    // act
    const result = handler.handle(input);
    // assert
    t.is(result.length, 1, 'incorrect number of results');
    t.is(result[0].msgId, 2049, 'incorrect eventId on result[0]');  
});

test.serial('can handle multiple lines', t => {
    // arrange
    const input = `|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
|2048|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1422|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
|2047|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1421|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|`;
    // act
    const result = handler.handle(input);
    // assert
    t.is(result.length, 3, 'incorrect number of results');
    t.is(result[0].msgId, 2049, 'incorrect eventId on result[0]');
    t.is(result[1].msgId, 2048, 'incorrect eventId on result[1]');
    t.is(result[2].msgId, 2047, 'incorrect eventId on result[2]');    
});

test.serial('can handle trailing newline', t => {
    // arrange
    const input = `|2049|create|event|1500560941381|f5e8fcd3-8f20-40b3-826e-f97bf95f1423|Football|Premier League|\\|Manchester Utd\\| vs \\|Manchester City\\||1500560978604|0|1|
`;
    // act
    const result = handler.handle(input);
    // assert
    t.is(result.length, 1, 'incorrect number of results');
    t.is(result[0].msgId, 2049, 'incorrect eventId on result[0]');    
});