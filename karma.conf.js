/*
 * *
 *  Copyright © 2017 Uncharted Software Inc.
 *
 *  Property of Uncharted™, formerly Oculus Info Inc.
 *  http://uncharted.software/
 *
 *  Released under the MIT License.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of
 *  this software and associated documentation files (the "Software"), to deal in
 *  the Software without restriction, including without limitation the rights to
 *  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 *  of the Software, and to permit persons to whom the Software is furnished to do
 *  so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 * /
 */

var istanbul = require('browserify-istanbul');

function isDebug(argument) {
    return argument === '--debug';
}

var coverageIgnore = ['**/uncharted.personas.dependencies.js', '**/tests/**'];
module.exports = function(config) {

    if (process.argv.some(isDebug))
        console.log("Running Karma in --debug mode. Coverage will not be reported.");

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['browserify', 'mocha', 'sinon-chai'],


        // list of files / patterns to load in the browser
        files: [
            'dist/uncharted.personas.dependencies.js',
            'tests/*.js'
        ],


        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'tests/*.js': ['browserify']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: !process.argv.some(isDebug) ? ['mocha', 'coverage', 'bamboo'] : ['mocha', 'bamboo'],
        coverageReporter: {
            reporters: [
                {type: 'text'},
                {type: 'text-summary'},
                {type: 'clover', subdir: '.', file: 'clover.xml'},
                {type: 'html', subdir: '.'},
            ]

        },
        bambooReporter: {
            filename: 'bamboo/mocha.json'
        },
        // web server port
        port: 9877,

        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity,
        browserify: {
            configure: function(bundle) {
                bundle.once('prebundle', function() {
                    bundle.transform('browserify-shim');
                    if (!process.argv.some(isDebug))
                        bundle.transform(istanbul({
                            ignore: coverageIgnore,
                            defaultIgnore: true
                        }));
                });
            },
            debug:true
        }
    });
};
