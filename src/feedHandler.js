import feedParser from './feedParser';
import dataAdaptor from './data/dataAdaptor';

export default {
    connect: async (connectionString) => {
        await dataAdaptor.connect(connectionString);
    },
    handle: (data) => {        
        const results = parseData(data);
        results.forEach((line) => handleLine(line));
        return results;
    },
    disablePersist: () => {
        this.persist = false;
    }
};

const parseData = (data) => {
    return data.split('\n')
        .filter((line) => line !== '')
        .map((line) => {
            return feedParser.parse(line);
        });
};

const handleLine = (line) => {
    // console.log(`handling ${line.operation} for ${line.type}`);
    try {
        switch (line.type) {
        case 'event':
            handleEvent(line);
            break;
        case 'market':
            handleMarket(line);
            break;
        case 'outcome':
            handleOutcome(line);
            break;
        default:
            throw new Error(`invalid packet type: ${line.type}`);
        }
    }
    catch (err) {
        console.log(err); // eslint-disable-line no-console
    }
};

const handleEvent = (line) => {
    handleOperation(line, dataAdaptor.fixture);
};

const handleMarket = (line) => {
    handleOperation(line, dataAdaptor.market);
};

const handleOutcome = (line) => {
    handleOperation(line, dataAdaptor.outcome);
};

const handleOperation = (line, adaptor) => {
    switch (line.operation) {
    case 'update':
        adaptor.update(line);
        break;
    case 'create':
        adaptor.create(line);
        break;
    default:
        throw new Error(`invalid operation: expected create or update but found "${line.operation}"`);
    }
};