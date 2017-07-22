import feedParser from './feedParser';
import dataAdaptor from './data';

export default {
    connect: async (connectionString) => {
        await dataAdaptor.connect(connectionString);
    },
    handle: (data) => {        
        const result = parseData(data);
        result.successful.forEach((line) => handleLine(line));
        return result;
    },
    disablePersist: () => {
        this.persist = false;
    }
};

const parseData = (data) => {
    const failed = [];
    const successful = [];
    data.split('\n')
        .filter((line) => line !== '')
        .forEach((line) => {
            try {
                successful.push(feedParser.parse(line));
            }
            catch (error) {
                failed.push({ line, error, message: error.message });
            }
        });
    return {
        successful,
        failed
    };
};

const handleLine = (line) => {
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