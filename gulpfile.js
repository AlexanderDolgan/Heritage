'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('spritesmith'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    rimraf = require('rimraf'),
    graceful = require('graceful-fs'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    //export paths
    build: {
        fonts: 'build/fonts/',
        img: 'build/img/',
        html: 'build/',
        js: 'build/js/',
        foundjs:'build/js',
        css: 'build/style'
    },
    //source paths
    src: {
        fonts: 'src/fonts/**/*.*',
        img: 'src/img/**/*.*',
        html: 'src/*.html',
        js: 'src/js/main.js',
        foundjs: '../bower_components/foundation-sites/js',
        css: 'src/style/*.scss'
    },
    //whatcher paths
    watch: {
        fonts: 'src/fonts/**/*.*',
        img: 'src/img/**/*.*',
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/style/**/*.scss'
    },
    clean: './build'
};

//config for the web server
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "heritage"
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(rigger())
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('../js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

//

gulp.task('style:build', function () {
    gulp.src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(rigger())
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleancss())
        .pipe(sourcemaps.write('../style'))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function() {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task ('fonts:build', function() {
   gulp.src(path.src.fonts)
       .pipe(gulp.dest(path.build.fonts))
});

gulp.task ('build', [
    'html:build',
    'js:build',
    'style:build',
    'image:build',
    'fonts:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });

});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);