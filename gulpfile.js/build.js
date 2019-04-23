const gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

var styles = require('./styles').styles,
scripts = require('./scripts').scripts,
icons = require('./sprites').icons;

function previewDist() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './dist' // points to where index.html from the production build lives
    }
  }); 
};

exports.previewDist = previewDist;

function deleteDistFolder() {
  return del('./dist');
};

function copyGeneralFiles() {
  return gulp.src('./app/general-files/*')
    .pipe(gulp.dest('./dist/general-files'));
};

function optimizeImages() {
  return gulp.src([
    './app/assets/images/**/*',
    '!./app/assets/images/icons',
    '!./app/assets/images/icons/**/*'
  ])
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./dist/assets/images'));
};

function useMin() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest('./dist'))
};

exports.build = gulp.series(
  deleteDistFolder,
  copyGeneralFiles,
  icons,
  optimizeImages,
  styles,
  scripts,
  useMin
);