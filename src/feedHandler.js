import feedParser from './feedParser';

export default {
    handle: (input) => {
        return input.split('\n')
            .filter((line) => line !== '')
            .map((line) => {
                return feedParser.parse(line);
            });
    }
};