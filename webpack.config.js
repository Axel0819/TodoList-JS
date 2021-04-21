//archivo que busca en npm run build:dev
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [
        new CssMinimizerPlugin(),
    ],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /styles\.css$/,
                use: [
                'style-loader', 
                'css-loader'
                ],
            },
            {
                test: /styles\.css$/,
                use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: false,
                    sources: false
                },
            },
            //error en la configuracion de esta regla->FILE-LOADER
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],
        }),
    ]
}

