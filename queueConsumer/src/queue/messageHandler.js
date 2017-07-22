export default class MessageHandler {
    constructor (dataHandler) {
        this._dataHandler = dataHandler;
    }

    handle(message) {
        if (!this || !this._dataHandler) throw new Error('a data handler must be supplied to perform this operation');

        try {
            switch (message.type) {
            case 'event':
                this.handleOperation(message, this._dataHandler.fixture);
                break;
            case 'market':
                this.handleOperation(message, this._dataHandler.market);
                break;
            case 'outcome':
                this.handleOperation(message, this._dataHandler.outcome);
                break;
            default:
                throw new Error(`invalid message type: ${message.type}`);
            }
        }
        catch (err) {
            throw err;
        }
    }

    handleOperation (message, handler) {
        switch (message.operation) {
        case 'update':
            handler.update(message);
            break;
        case 'create':
            handler.create(message);
            break;
        default:
            throw new Error(`invalid operation: expected create or update but found "${message.operation}"`);
        }
    }
}