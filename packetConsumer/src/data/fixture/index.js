import Fixture from './fixture.model';

export default {
    create: async (fixture) => createFixture(fixture),
    update: async (fixture) => updateFixture(fixture)
};

const createFixture = async (fixture) => {
    
    const { 
        eventId, 
        category, 
        subCategory, 
        name, 
        startTime,
        displayed, 
        suspended
    } = fixture;

    const model = new Fixture({ 
        eventId, 
        category, 
        subCategory, 
        name, 
        startTime,
        displayed, 
        suspended
    });

    await model.save((err) => {
        if(err) throw err;
    });
};

const updateFixture = async (fixture) => {
    const { 
        eventId, 
        category, 
        subCategory, 
        name, 
        startTime, 
        displayed, 
        suspended
    } = fixture;

    Fixture.findOne({'eventId': eventId}, (err, model) => {
        if (err) throw err;

        model.category = category;
        model.subCategory = subCategory;
        model.name = name;
        model.startTime = startTime;
        model.displayed = displayed;
        model.suspended = suspended;
        
        model.save((err) => {
            if (err) throw err;
        });
    });
};