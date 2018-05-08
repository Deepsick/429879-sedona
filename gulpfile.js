'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server       = require('browser-sync').create();
var wait         = require('gulp-wait');
var minify       = require('gulp-csso');
var rename       = require('gulp-rename');
var imagemin     = require('gulp-imagemin');
var webp         = require('gulp-webp');
var svgstore     = require('gulp-svgstore');
var posthtml     = require('gulp-posthtml');
var include      = require('posthtml-include');
var del          = require('del');
var run          = require('run-sequence');
var uglify       = require('gulp-uglify');
var pump         = require('pump');
var concat       = require('gulp-concat');
var minimize     = require('gulp-minimize');

gulp.task('style', function() {
  gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(wait(500))
    .pipe(sass())
    .pipe(wait(500))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
});

// gulp.task('scripts', function() {
//   return gulp.src('source/js/*.js')
//   .pipe(concat('common.js'))
//   .pipe(gulp.dest('source/js'))
// });

gulp.task('minifyscripts', function(cb) {
  pump([
      gulp.src('source/js/**/*.js'),
      uglify(),
      gulp.dest('build/js')
    ],
    cb
  );
});

gulp.task('minimizehtml', function() {
  gulp.src('build/*.html')
  .pipe(minimize())
  .pipe(rename(function(path) {
    path.basename += '.min'
  }))
  .pipe(gulp.dest('build'));
});

gulp.task('images', function() {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({optimizayionLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function() {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest('source/img'));
});

gulp.task('sprite', function() {
  return gulp.src('source/img/sprite-*.svg')
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
});

gulp.task('html', function() {
  return gulp.src('source/*.html')
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest('build'));
});

gulp.task('copy', function() {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('prebuild', function(done) {
  run(
    'images',
    'webp',
    done
  );
});

gulp.task('build', function(done) {
  run(
    'clean',
    'copy',
    'style',
    'sprite',
    'html',
    'minimizehtml',
    'minifyscripts',
    done
  );
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', ['style']);
  gulp.watch('source/*.html', ['html']);
});
