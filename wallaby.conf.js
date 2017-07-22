module.exports = function (wallaby) {
    return {
        files: [
            '**/*.js',
            '!**/*.test.js',
            '!node_modules/**/*.js'
        ],
        tests: [
            '**/*test.js',
            '!node_modules/**/*.js'
        ],
        env: {
            type: 'node',
            runner: 'node'
        },
        compilers: {
            '**/*.js': wallaby.compilers.babel({
                babelrc: true
            })
        },
        testFramework: 'ava',
        setup: function () {
            require('babel-register');
            require('babel-polyfill');
        },
    };
};