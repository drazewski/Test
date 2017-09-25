var config = {
    sass: './assets/scss/*.{scss,sass}',
    sassFolder: './assets/sass/',
    css: './dist/css',
};

// Core
require('es6-promise').polyfill();
var gulp        = require('gulp');
var gutil       = require('gulp-util');

// Stylesheets
var sass        = require('gulp-sass');
var notify      = require("gulp-notify");
var plumber     = require('gulp-plumber');
var pleeease    = require('gulp-pleeease');
var sourcemaps  = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var sprite = require('gulp-sprite-generator');
var spritesmith = require('gulp.spritesmith');

// Tools
var plumber     = require('gulp-plumber');

var PleeeaseOptions = {
    autoprefixer: true,
    pseudoElements: true,
    import: true,
    minifier: true,
    mqpacker: false,
    next: false,
    browsers: ["last 3 versions", "ie 9"]
};

gulp.task('serve', function(done) {
    var express = require('express');
    var app = express();
    app.use(express.static(__dirname));
    app.listen(4004, function () {
        done();
    });
});

gulp.task('sass', function () {
    gulp.src( './assets/scss/*.{scss,sass}' )
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            onError: function(err) {
                return notify().write(err);
            },
            includePaths : ['scss/'],
        }))
        .pipe(sourcemaps.write())
        .pipe(pleeease(PleeeaseOptions))
        .pipe(gulp.dest( './dist/css' ))
        .pipe(livereload());
    // .pipe(notify({ message: 'Styles generated' }));

});

gulp.task('live', function() {
    gulp.src( '**/*.php' )
        .pipe(livereload());
});

gulp.task('default', ['serve', 'sass' ], function () {
    gulp.watch( config.sass , ['sass']);
    gulp.watch('*.php', ['live']);
    //gulp.watch( config.spriteSrc , ['sprite']);
    livereload.listen(31752);
});


 