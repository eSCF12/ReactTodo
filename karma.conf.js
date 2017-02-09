var baseConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        basePath: '',
        // browsers: ['ChromeWithoutSecurity'],
        // customLaunchers: {
        //     ChromeWithoutSecurity: {
        //         base: 'Chrome',
        //         flags: ['--disable-web-security']
        //     }
        // },
        browsers: ['Chrome'],
        // browsers: ['Firefox', 'FirefoxDeveloper', 'FirefoxAurora', 'FirefoxNightly'],
        // customLaunchers: {
        //     Chrome_without_security: {
        //         base: 'Chrome',
        //         flags: ['--disable-web-security']
        //     }
        // },
        autoWatch: false,
        singleRun: true,
        concurrency: Infinity,
        logLevel: config.LOG_DEBUG,

        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/foundation-sites/dist/js/foundation.min.js',
            './app/tests/**/*.test.jsx'
        ],
        preprocessors: {
            './app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
        },
        reporters: ['mocha'],
        client: {
            mocha: {
                timeout: '5000'
            }
        },
        webpack: {
            module: baseConfig.module,
            node: baseConfig.node,
            devtool: baseConfig.devtool,
            resolve: baseConfig.resolve,
            resolveLoader: baseConfig.resolveLoader,
            plugins: baseConfig.plugins,
            module: {
                rules: baseConfig.module.rules
            }
        },
        webpackMiddleware: {
            stats: "errors-only"
        },
        webpackServer: {
            noInfo: false
        },
        browserConsoleLogOptions: {
            level: 'error',
            format: '%T %b: %m',
            terminal: false
        },
        port: 9876,
        colors: true
    });
};
