import Fixture from '../fixture/fixture.model';

export default {
    create: async (outcome) => createOutcome(outcome),
    update: async (eventId, outcome) => updateOutcome(eventId, outcome)
};

const createOutcome = async (outcome) => {
    const {
        marketId,
        outcomeId,
        name,
        price,
        displayed, 
        suspended
    } = outcome;

    await Fixture.update(
        {
            'markets.marketId': marketId
        },
        { $push: {
            'markets.$.outcomes': {  
                outcomeId,
                name,
                price,
                displayed, 
                suspended,
            }
        }}, (err) => {
            if (err) throw err;
        });
};

const updateOutcome = async (outcome) => {
    const { 
        marketId,
        outcomeId,
    } = outcome;

    // unable to update deeply nested arrays in mongo due to bug
    // https://jira.mongodb.org/browse/SERVER-831
    // as a workaround we remove and create the outcome

    await Fixture.update(
        {
            'markets.marketId': marketId,
            'markets.outcomes.outcomeId': outcomeId
        },
        { $pull : { 'markets.$.outcomes' : { outcomeId } }

        }, (err) => {
            if (err) throw err;
        }
    );

    await createOutcome(outcome);
};