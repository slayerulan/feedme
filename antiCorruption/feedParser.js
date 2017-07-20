export default {
    parse: (input) => {
        const packet = parseInput(input);

        switch (packet.type) {
        case 'event': 
            return parseEvent(packet);
        default:
            return packet;
        }
    }
};

const parseInput = (input) => {
    const items = input.match(/(\\\||[^\\\][^\|])+/g);
    console.log('items: ', items);
    return {
        msgId: items[0],
        operation: items[1],
        type: items[2],
        timestamp: new Date(parseInt(items[3])),
        body: items.slice(4,items.length)
    };
};

const parseEvent = (packet) => {

    console.log(packet);

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