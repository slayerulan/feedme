const FeedParser = () => {};

FeedParser.prototype.parse = (input) => {
    const packet = parseInput(input);

    switch (packet.type) {
    case 'event': 
        return parseEvent(packet);
    case 'market':
        return parseMarket(packet);
    case 'outcome':
        return parseOutcome(packet);
    default:
        throw new Error(`unexpected packet of type ${packet.type} found`);
    }
};

export default new FeedParser();

const parseInput = (input) => {
    // using regex as input.split doesn't handle escaped characters.
    // after the many layer of escaped characters this regex breaks down as
    // - match escaped pipes \\\| => \|
    // - OR anything other than a pipe [^\\|] => [^|]
    const items = input.match(/(\\\||[^\\|])+/g);

    return {
        msgId: parseMsgId(items[0]),
        operation: items[1],
        type: items[2],
        timestamp: parseTimestamp(items[3]),
        body: items.slice(4,items.length)
    };
};

const parseStartTime = (input) => {
    return parseInteger(input, 'startTime');
};

const parseTimestamp = (input) => {
    return parseInteger(input, 'timestamp');
};

const parseMsgId = (input) => {
    return parseInteger(input, 'msgId');
};

const parseInteger = (input, field) => {
    const result = parseInt(input);

    if (isNaN(result)) throw new Error(`invalid format: expected ${field} to be an integer but found "${input}"`);

    return result;
};

const parseEvent = (packet) => {
    const { msgId, operation, type, timestamp, body } = packet;
    return {
        msgId,
        operation,
        type,
        timestamp,
        eventId: body[0],
        category: body[1],
        subCategory: body[2],
        name: body[3],
        startTime: parseStartTime(body[4]),
        displayed: body[5] == 1,
        suspended: body[6] == 1
    };
};

const parseMarket = (packet) => {
    const { msgId, operation, type, timestamp, body } = packet;
    return {
        msgId,
        operation,
        type,
        timestamp,
        eventId: body[0],
        marketId: body[1],
        name: body[2],
        displayed: body[3] == 1,
        suspended: body[4] == 1
    };
};

const parseOutcome = (packet) => {
    const { msgId, operation, type, timestamp, body } = packet;
    return {
        msgId,
        operation,
        type,
        timestamp,
        marketId: body[0],
        outcomeId: body[1],
        name: body[2],
        price: body[3],
        displayed: body[4] == 1,
        suspended: body[5] == 1
    };
};