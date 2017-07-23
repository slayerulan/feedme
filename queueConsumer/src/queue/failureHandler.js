export default class MessageHandler {
    constructor (dataHandler) {
        this._dataHandler = dataHandler;
    }

    handle(message) {
        if (!this || !this._dataHandler) throw new Error('a data handler must be supplied to perform this operation');

        try {
            this._dataHandler.failure.create(message);
        }
        catch (err) {
            throw err;
        }
    }
}