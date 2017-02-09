var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        // browsers: ['Firefox', 'FirefoxDeveloper', 'FirefoxAurora', 'FirefoxNightly'],
        // customLaunchers: {
        //     Chrome_without_security: {
        //         base: 'Chrome',
        //         flags: ['--disable-web-security']
        //     }
        // },
        singleRun: true,
        frameworks: ['mocha'],
        files: ['app/tests/**/*.test.jsx'],
        preprocessors: {
            'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
        },
        reporters: ['mocha'],
        client: {
            mocha: {
                timeout: '30000'
            }
        },
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        }
    });
};
