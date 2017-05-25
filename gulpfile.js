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

'use strict';
/* eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var browserify = require('browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var karma = require('karma');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var path = require('path');
var fs = require('fs');
var runSequence = require('run-sequence');

var config = {
    distFolder: 'dist/',
    exampleFolder: 'example/',
    testFolder: 'tests/',
    testRunnerFolder: 'tests/runner/',
    testDependenciesFolder: 'tests/runner/ext',
    srcFiles: 'src/**/*.js',
    sassFiles: 'sass/**/*.scss'
};

gulp.task('default', ['lint', 'sass', 'scripts']);

gulp.task('ci',['scripts', 'sass'],function(callback) {
    runSequence('lint', 'test', callback);
});

gulp.task('test', function(done) {
    if (!fs.existsSync('bamboo')) fs.mkdirSync('bamboo');
    new karma.Server({
        configFile: path.join(__dirname, '/karma.conf.js'),
        singleRun: true,
        browsers: ['PhantomJS'],
    }, function(exitcode) {
        process.exit(exitcode);
    }).start();
});

// Run the tests in Chrome and keep browser open for debugging
gulp.task('tdd', function(done) {
    new karma.Server({
        configFile: path.join(__dirname, '/karma.conf.js'),
        reporters: ['mocha']
    }, done).start();
});

gulp.task('sass', function() {
    return gulp.src(config.sassFiles)
        .pipe(sass())
        .pipe(gulp.dest(config.distFolder));
});

gulp.task('lint', function() {
    return gulp.src(config.srcFiles)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('scripts', ['scripts_personas', 'scripts_dependencies']);

gulp.task('scripts_personas', function() {
    return browserify('src/personas.js', {
        standalone: 'Uncharted.Personas',
    })
        .bundle()
        .pipe(source('uncharted.personas.js'))
        .pipe(gulp.dest(config.distFolder))
        .pipe(streamify(uglify()))
        .pipe(rename(function(file) {
            file.basename = 'uncharted.personas.min';
            file.dirname = '';
        }))
        .pipe(gulp.dest(config.distFolder));
});

gulp.task('scripts_dependencies', ['font-awesome'], function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js',
            'node_modules/underscore/underscore-min.js',
            'node_modules/velocity-animate/velocity.min.js',
            'node_modules/bluebird/js/browser/bluebird.min.js',
            'node_modules/snapsvg/dist/snap.svg-min.js'])
        .pipe(concat('uncharted.personas.dependencies.js'))
        .pipe(gulp.dest(config.distFolder));
});

gulp.task('font-awesome', function() {
    return gulp.src(['css/font-awesome.css', 'fonts/**'], {cwd: 'node_modules/font-awesome'})
        .pipe(rename(function(file) {
            if (file.extname !== '.css') file.dirname = './fonts';
        }))
        .pipe(gulp.dest(config.exampleFolder));
});

gulp.task('deploy', function(done) {
   runSequence('sass','scripts',done);
});

gulp.task('watch', function() {
    gulp.watch(config.sassFiles, ['sass']);
    gulp.watch(config.srcFiles, ['scripts_personas']);
});
