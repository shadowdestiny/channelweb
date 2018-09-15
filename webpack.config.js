const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './public/index.html',
    filename : 'index.html',
    inject: 'body'
});

const config = {
    entry:'./src/index.jsx',
    output: {
        path : path.resolve('dist'),
        filename:'bundle.js'
    },
    module: {

        rules:[
            {
                test: /.jsx$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader',
                },
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test: /(\.css|\.scss)$/,
                exclude: /node_modules/,
                use:{
                    loader:'style-loader!css-loader!sass-loader'
                }
            }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig
    ]
};

module.exports = config;