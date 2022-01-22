const webpackConfig = require('./webpack.config.js')

module.exports = function(config) {
    config.set({
        frameworks: ['mocha'],
        files: ['test/**/*.spec.js'],
        webpack: webpackConfig,
        reporters: ['spec'],
        browsers: ['Chrome'],
        preprocessors: {
            '**/*.spec.js': ['webpack', 'sourcemap']
        }
    })
}