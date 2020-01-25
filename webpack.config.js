const path = require('path');
module.exports = {
    entry: {
        index: './docs/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    output: {
        chunkFilename: '[name].js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'docs')
    }
};
