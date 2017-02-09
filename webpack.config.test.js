var webpack = require('webpack');
var path = require('path');
var APP_ROOT = __dirname;

module.exports = {

    entry: {
        vendor: [
            '!!script-loader!jquery/dist/jquery.min.js',
            '!!script-loader!foundation-sites/dist/js/foundation.min.js',
            './app/app.jsx'
        ]
    },
    externals: {
        jquery: 'jQuery',
        foundation: 'Foundation',
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoEmitOnErrorsPlugin(),
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
        }),
        new HtmlWebpackPlugin({
            cache: true,
            filename: "test/index.html",
            showErrors: true,
            template: "./test/support/index.html",
            title: "Mocha Browser Tests",
        }),
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
    node: {
        fs: 'empty',
        child_process:'empty'
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
    devtool: 'cheap-module-eval-source-map'
};
