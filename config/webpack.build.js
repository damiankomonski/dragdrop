const webpack = require('webpack');

const config = require('./webpack.config');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = webpackMerge(config, {
    devtool: '#source-map',

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass'),
                exclude: /(node_modules)/
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        new DefinePlugin({
            ENV: JSON.stringify('production')
        }),

        new ExtractTextPlugin('[name].[chunkhash].css')
    ]
});
