var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        vendor: [
            "!!script-loader!jquery/dist/jquery.min.js",
            "!!script-loader!foundation-sites/dist/js/foundation.js",
            './app/app.js'
        ]
    },
    externals: {
        jquery: 'jQuery',
        foundation: 'Foundation'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        //new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            foundation: 'Foundation'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                sassLoader: {
                    includePaths: [
                        path.resolve(__dirname, './node_modules/foundation-sites/scss')
                    ]
                }
            }
        })
    ],
    output: {
        path: __dirname + '/',
        filename: 'public/bundle.js'
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules/',
            './app/components/'
        ],
        alias: {
            applicationStyle: path.resolve(__dirname, './app/styles/app.scss'),
            foundation: path.resolve(__dirname, './node_modules/foundation-sites/js/foundation.core')
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "sass-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader", // Do not use "use" here
                options: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                exclude: /(node_modules|bower_components)/
            }
        ]
    },

    devtool: 'cheap-module-eval-source-map'
};
