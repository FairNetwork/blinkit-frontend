const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            fs: false, // Deaktiviert fs
            crypto: require.resolve('crypto-browserify'), // Polyfill für crypto
            stream: require.resolve('stream-browserify') // Polyfill für stream
        }
    }
};
