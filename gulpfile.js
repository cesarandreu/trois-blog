'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  rev = require('gulp-rev'),
  del = require('del'),
  path = require('path');

var manifest = require('./manifest');
var config = {
  assets: path.join(__dirname, 'public/assets')
};

gulp.task('clean', function (cb) {
  del([config.assets], cb);
});

// production builds
gulp.task('build', ['build-styles']);

gulp.task('build-styles', function () {
  return gulp.src(manifest.styles)
    .pipe(autoprefixer({browser: ['> 5%', 'ie >= 7']}))
    .pipe(concat('styles.css'))
    .pipe(minifyCSS({compatibility: 'ie7'}))
    .pipe(rev())
    .pipe(gulp.dest(config.assets))
    .pipe(rev.manifest({path: 'styles-manifest.json'}))
    .pipe(gulp.dest(config.assets));
});


// development
gulp.task('dev', ['dev-styles'], function () {
  gulp.watch(manifest.styles, ['dev-styles']);
});

gulp.task('dev-styles', function () {
  return gulp.src(manifest.styles)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(config.assets));
});
