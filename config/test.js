const helpers = require('./helpers');
const webpack = require('webpack');
const validator = require('webpack-validator');
const clearWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = validator({
    entry: {
        app: './src/app/app.js',
        vendor: './src/vendor.js'
    },

    output: {
        filename: '[name].[chunkhash].js',
        path:  helpers.absolutePath('build')
    },

    module: {

        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/
            }
        ],

        loaders: [
            {
                test: /\.js$/,
                loaders: ['ng-annotate','babel?presets=es2015'],
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
        configFile: './config/eslintrc.json'
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
        })
    ],

    devServer: {
        port: 3000,
        host: 'localhost',

        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300
        },

        stats: 'errors-only'
    }

});