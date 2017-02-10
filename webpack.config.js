var webpack = require('webpack');
var path = require('path');
var APP_ROOT = __dirname;

module.exports = {

    entry: {
        vendor: [
            '!!script-loader!jquery/dist/jquery.min.js',
            '!!script-loader!foundation-sites/dist/js/foundation.min.js',
            './app/app.js'
        ]
    },
    externals: {
        jquery: 'jQuery',
        foundation: 'Foundation',
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
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
                        path.resolve(APP_ROOT, './node_modules/foundation-sites/scss')
                    ]
                }
            }
        })
    ],
    output: {
        path: APP_ROOT + '/',
        filename: path.resolve(APP_ROOT, 'public/bundle.js'),
        pathinfo: false
    },
    resolve: {
        modules: [
            __dirname,
            path.resolve(APP_ROOT, './node_modules'),
            path.resolve(APP_ROOT, './app/components/'),
            path.resolve(APP_ROOT, './app/components/tests/')
        ],
        alias: {
            applicationStyles: path.resolve(APP_ROOT, './app/styles/app.scss'),
            foundation: path.resolve(APP_ROOT, './node_modules/foundation-sites/js/foundation.core')
        },
        extensions: ['.js', '.jsx'],
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    performance: {
        hints: false
    },
    node: {
        fs: 'empty',
        child_process: 'empty'
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
    target: 'node',
    devServer: {
        stats: {
            colors: true,
            // hash: false,
            // version: false,
            // timings: false,
            // assets: false,
            // chunks: false,
            // modules: false,
            // reasons: false,
            // children: false,
            // source: false,
            // errors: true,
            // errorDetails: true,
            // warnings: false,
            // publicPath: true
        }
    },
    devtool: 'cheap-module-eval-source-map'
};
