import feedParser from './feedParser';

export default {
    handle: (input) => {
        return input.split('\n').map((line) => {
            return feedParser.parse(line);
        });
    }
};