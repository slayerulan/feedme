import feedParser from './feedParser';

export default class FeedHandler {
    constructor (packetHandler) {
        this._packetHandler = packetHandler;
    }

    handle(data) {
        if (!this || !this._packetHandler) throw new Error('a packet handler must be supplied to perform this operation');

        const result = this.parseData(data);
        result.successful.forEach((packet) => this.handleLine(packet));
        return result;
    }

    parseData(data) {
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
    }

    handleLine(line) {
        try {
            switch (line.type) {
            case 'event':
                this.handleOperation(line, this._packetHandler.fixture);
                break;
            case 'market':
                this.handleOperation(line, this._packetHandler.market);
                break;
            case 'outcome':
                this.handleOperation(line, this._packetHandler.outcome);
                break;
            default:
                throw new Error(`invalid packet type: ${line.type}`);
            }
        }
        catch (err) {
            console.log(err); // eslint-disable-line no-console
            throw err;
        }
    }

    handleOperation (line, handler) {
        switch (line.operation) {
        case 'update':
            handler.update(line);
            break;
        case 'create':
            handler.create(line);
            break;
        default:
            throw new Error(`invalid operation: expected create or update but found "${line.operation}"`);
        }
    }
}