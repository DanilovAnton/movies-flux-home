const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const javascript = require('./webpack_modules/javascript');
const style = require('./webpack_modules/style');

const isDevMode = mode => mode === 'development';
const directory = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
    public: path.join(__dirname, 'public'),
};

const config = (env, {mode}) => merge([
    {
        entry: [directory.source + '/index.js'],

        output: {
            path: directory.build,
            filename: 'scripts/bundle.[hash:8].js',
            publicPath: '/'
        },

        devtool: isDevMode(mode) ? 'inline-source-map' : 'source-map',

        devServer: {
            historyApiFallback: true,
            host: 'localhost',
            port: 3000,
            overlay: true,
        },

        plugins: [
            new CleanWebpackPlugin('build'),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: directory.public + '/index.html',
                favicon: 'public/favicon.ico'
            })
        ],
    },
    javascript(),
    style(isDevMode(mode))
]);

module.exports = config;