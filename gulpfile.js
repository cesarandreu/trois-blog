'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-minify-css'),
  runSequence = require('run-sequence'),
  webpack = require('gulp-webpack'),
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

// TODO: add asset revisioning
gulp.task('images', function () {
  gulp.src(manifest.images)
    .pipe(gulp.dest(config.assets));
});

// production builds
gulp.task('build', function (cb) {
  runSequence('clean', ['build-styles', 'build-application', 'images'], cb);
});

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

gulp.task('build-application', function () {
  return gulp.src(manifest.application)
  .pipe(webpack(require('./webpack.dist.config.js')))
  .pipe(rev())
  .pipe(gulp.dest(config.assets))
  .pipe(rev.manifest({path: 'application-manifest.json'}))
  .pipe(gulp.dest(config.assets));
});


// development
gulp.task('dev', ['dev-styles', 'images'], function () {
  gulp.watch(manifest.styles, ['dev-styles']);
});

gulp.task('dev-styles', function () {
  return gulp.src(manifest.styles)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(config.assets));
});
