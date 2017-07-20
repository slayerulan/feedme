export default {
    parse: (input) => {
        const packet = parseInput(input);

        switch (packet.type) {
        case 'event': 
            return parseEvent(packet);
        case 'market':
            return parseMarket(packet);
        default:
            return packet;
        }
    }
};

const parseInput = (input) => {
    // using regex as input.split doesn't handle escaped characters.
    // after the many layer of escaped characters this regex breaks down as
    // - match escaped pipes \\\| => \|
    // - OR anything other than a pipe [^\\|] => [^|]
    const items = input.match(/(\\\||[^\\|])+/g);
    return {
        msgId: items[0],
        operation: items[1],
        type: items[2],
        timestamp: new Date(parseInt(items[3])),
        body: items.slice(4,items.length)
    };
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
        startTime: new Date(parseInt(body[4])),
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