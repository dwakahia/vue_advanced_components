const webpackConfig = require('./webpack.config.js')

module.exports = function(config) {
    config.set({
        frameworks: ['mocha'],
        files: [
            'components/**/.js',
            'test/**/*.spec.js'
        ],
        webpack: webpackConfig,
        reporters: ['spec'],
        browsers: ['Chrome'],
        preprocessors: {
            //'**/*.spec.js': ['webpack', 'sourcemap'],
            'components/**/*.js': ['webpack'],
            'tests/**/*.spec.js': ['webpack']
        },
        autoWatch: true,
    })
}

