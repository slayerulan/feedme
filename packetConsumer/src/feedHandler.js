import feedParser from './feedParser';

export default class FeedHandler {
    constructor (messageQueue) {
        this._messageQueue = messageQueue;
    }

    handle(data) {
        if (!this || !this._messageQueue) throw new Error('a packet handler must be supplied to perform this operation');

        const result = this.parseData(data);

        this._messageQueue.enqueue(result.successful);

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
}