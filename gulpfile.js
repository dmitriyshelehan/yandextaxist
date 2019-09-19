'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const del = require('del');

// Live Reload
gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: "build/"
        }
    })
});

// Clean Build
gulp.task('del', function(){
    return del.sync('build');
});

// Html
gulp.task('html', function(){
    return gulp.src('src/pug/pages/**/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError()
        }))
        .pipe(pug())
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
});

// Optimize Images
gulp.task('image', function(){
   return gulp.src('src/img/**/*')
            .pipe(imagemin())
            .pipe(gulp.dest('build/img'))
            .pipe(browserSync.stream());
});

// Fonts
gulp.task('fonts', function(){
    return gulp.src('src/fonts/**/*{ttf,woff,woff2,svg,eot}')
        .pipe(gulp.dest('build/fonts'))
        .pipe(browserSync.stream());
});

// Compile SASS
gulp.task('css', function(){
    return gulp.src('src/scss/**/*.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(autoprefixer({
                browsers: ['last 5 versions'],
                cascade: false
             }))
             .pipe(cssmin())
             .pipe(rename({suffix: '.min'}))
             .pipe(gulp.dest('build/css'))
             .pipe(browserSync.stream());
});

// Minify and Concat JS
gulp.task('scripts', function(){
    return gulp.src('src/js/**/*.js')
             .pipe(plumber())
             .pipe(concat('main.js'))
             .pipe(uglify())
             .pipe(rename({suffix: '.min'}))
             .pipe(gulp.dest('build/js'))
             .pipe(browserSync.stream());
});

// Watch
gulp.task('watch', function () {
    gulp.watch('src/pug/**/**/*.pug', ['html']);
    gulp.watch('src/scss/**/*.scss', ['css']);
    gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task('default', [ 'del', 'html', 'css', 'scripts', 'image', 'fonts', 'browserSync', 'watch' ]);
gulp.task('build', ['del', 'html', 'css', 'scripts', 'image', 'fonts' ]);