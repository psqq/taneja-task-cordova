const path = require('path');

const devConfig = {
    mode: 'development',
    entry: {
        index: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'www/js'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/js/',
    },
    devtool: 'inline-source-map',
    // module: {
    //     rules: [
    //         {
    //             test: /\.(js)$/,
    //             exclude: /(node_modules)/,
    //             loader: 'babel-loader',
    //             query: {
    //                 presets: [
    //                     [
    //                         "@babel/preset-env",
    //                         {
    //                             targets: {
    //                                 chrome: '33',
    //                             },
    //                             useBuiltIns: 'usage',
    //                             debug: false,
    //                             corejs: 3,
    //                         },
    //                     ]
    //                 ],
    //                 plugins: [
    //                     [
    //                         "@babel/plugin-transform-runtime",
    //                         {
    //                             "regenerator": true
    //                         }
    //                     ]
    //                 ],
    //             }
    //         }
    //     ]
    // },
};

const prodConfig = {
    mode: 'production',
    entry: {
        index: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'www/js'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/js/',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    chrome: '33',
                                },
                                useBuiltIns: 'usage',
                                debug: false,
                                corejs: 3,
                            },
                        ]
                    ],
                    plugins: [
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                "regenerator": true
                            }
                        ]
                    ],
                }
            }
        ]
    },
};

module.exports = {
    devConfig,
    prodConfig,
};
