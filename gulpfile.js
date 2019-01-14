"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URL u a web browser
var browserify = require('browserify');// Bundle JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // Concatenates files
var eslint = require('gulp-eslint'); // Lint JS files, including JSX

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ],
        images: './src/images/*',
        dist: './dist',
        mainJs: './src/main.js'
    }
};

//Tasks

// Start a local development server
gulp.task('connect', function(cb){
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', gulp.series(gulp.parallel('connect')), function(cb){
    return gulp.src('dist/index.html')
        .pipe(open({url: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function(cb){
    return gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function(cb){
    return browserify(config.paths.mainJs)
            .transform(reactify)
            .bundle()
            .on('error', console.error.bind(console))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(config.paths.dist + '/scripts'))
            .pipe(connect.reload());
});

gulp.task('css', function(){
    return gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function(){
    return gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());
});

gulp.task('lint', function(){
    return gulp.src(config.paths.js)
            .pipe(eslint({configFile: 'config.json'}))
            .pipe(eslint.format());
})

gulp.task('watch', function(){
    return gulp.watch(config.paths.html, gulp.series('html'));
});

gulp.task('watch-js', function(){
    return gulp.watch(config.paths.js, gulp.series('js', 'lint'));
});

gulp.task('default', gulp.series(gulp.parallel('html', 'js', 'css', 'images', 'lint', 'open', 'watch', 'watch-js')));