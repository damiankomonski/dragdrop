const helpers = require('./helpers');
const webpack = require('webpack');
const validator = require('webpack-validator');
const clearWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = validator({
    //odkad zaczynam w drzewie zaleznosci, sciezka od folderu glownego
    entry: {
        app: './src/app/app.js',
        vendor: './src/vendor.js'
    },

    output: {
        filename: '[name].js',
        path: helpers.absolutePath('build')
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/,
            }
        ],

        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?presets=es2015!eslint-loader',
                exclude: /(node_modules)/,
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass'),
                exclude: /(node_modules)/
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.absolutePath('src/index.html')]
            }
        ]
    },

    eslint: {
        configFile: './config/eslintsrc.json'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),

        new clearWebpackPlugin(['build'], {
            root: helpers.absolutePath(''),
            verbose: true
        }),

        new ExtractTextPlugin('[name].[chunkhash].css')
    ],

    devServer: {
        port: 4000,
        host: 'localhost',

        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300
        },

        stats: 'errors-only'
    }
});