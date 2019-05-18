const path = require('path');
module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    resolve: {
        extensions: [ '.js' ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    }
};
