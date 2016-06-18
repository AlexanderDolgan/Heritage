'use strict';

var gulp = require ('gulp'),
    watch = require ('gulp-watch'),
    prefixer = require ('gulp-autoprefixer'),
    cleancss = require ('gulp-clean-css'),
    uglify = require ('gulp-uglify'),
    imagemin = require ('gulp-imagemin'),
    plumber = require ('gulp-plumber'),
    rigger = require ('gulp-rigger'),
    sass = require ('gulp-sass'),
    sourcemaps = require ('gulp-sourcemaps'),
    spritesmith = require ('spritesmith'),
    pngquant = require ('imagemin-pngquant'),
    rimraf = require('rimraf'),
    graceful = require ('graceful-fs'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    //export paths
    build: {
        fonts: 'build/fonts/',
        img: 'build/img/',
        html: 'build/',
        js: 'build/js/',
        css: 'build/style/'
    },
    //source paths
    src : {
        fonts: 'src/fonts/**/*.*',
        img: 'src/img/**/*.*',
        html: 'src/*.html',
        js: 'src/js/main.js',
        css: 'src/style/main.scss'
    },
    //whatcher paths
    watch : {
        fonts: 'src/fonts/**/*.*',
        img: 'src/img/**/*.*',
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/style/**/*.scss'
    }
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "heritage"
};

gulp.task('html:build', function(){
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});