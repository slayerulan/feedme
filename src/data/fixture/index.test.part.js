import test from 'ava';
import '../test.helper';
import fixtureAdaptor from './';

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
    await fixtureAdaptor.create(fixture);
    // assert
    await t.context.db.models.Fixture.count({}, (err, count) => {
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
    await fixtureAdaptor.create(fixture);
    // act
    fixture.name = '\\|Manchester City\\| vs \\|Manchester Utd\\|';
    await fixtureAdaptor.update(fixture);
    // assert
    await t.context.db.models.Fixture.count({}, (err, count) => {
        if (err) t.fail(err.message);
        t.is(count, 1, 'incorrect number of records in mongo');        
    });
    await t.context.db.models.Fixture.findOne({'eventId': fixture.eventId}, (err, model) => {
        t.is(model.name, '\\|Manchester City\\| vs \\|Manchester Utd\\|');
    });
});