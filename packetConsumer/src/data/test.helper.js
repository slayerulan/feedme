import Fixture from './fixture/fixture.model';

const createTestFixture = async (eventId) => {
    const fixture = new Fixture({
        eventId, 
        category: 'Football', 
        subCategory: 'Premier League', 
        name: '\\|Manchester Utd\\| vs \\|Manchester City\\|', 
        startTime: 1500560978604, 
        displayed: false, 
        suspended: true
    });
    await fixture.save((err) => {
        if(err) throw err;
    });
};

const createTestMarket = async (eventId, marketId) => {
    await Fixture.update(
        { eventId },
        { $push: {
            markets: {  
                marketId,
                name: 'Both Teams To Score',
                displayed: true, 
                suspended: false,
                outcomes: []
            }
        }});
};

export default {
    createTestFixture,
    createTestMarket
};