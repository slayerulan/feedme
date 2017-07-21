import Fixture from './models/fixtureSchema';

export default {
    create: async (market) => createMarket(market),
    update: async (market) => updateMarket(market)
};

const createMarket = async (market) => {
    const { 
        eventId, 
        marketId,
        name,
        displayed, 
        suspended
    } = market;

    await Fixture.update(
        { eventId },
        { $push: {
            markets: {  
                marketId,
                name,
                displayed, 
                suspended,
                outcomes: []
            }
        }});
};

const updateMarket = async (market) => {
    const { 
        eventId, 
        marketId,
        name,
        displayed, 
        suspended
    } = market;

    await Fixture.update(
        { 
            eventId,
            'markets.marketId': marketId
        },
        { $set: {
            'markets.$.name': name,
            'markets.$.displayed': displayed,
            'markets.$.suspended': suspended
        }});
};