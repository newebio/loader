var webpack = require('webpack');
module.exports = {
    entry: __dirname + "/index.js",
    output: {
        filename: process.env.NODE_ENV == 'production' ? __dirname + "/dist/neweb-loader.min.js" : __dirname + "/dist/neweb-loader.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: process.env.NODE_ENV == 'production' ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ] : []
}