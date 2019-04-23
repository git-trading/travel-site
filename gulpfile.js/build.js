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
      baseDir: './docs' // points to where index.html from the production build lives
    }
  }); 
};

exports.previewDist = previewDist;

function deleteDistFolder() {
  return del('./docs');
};

function copyGeneralFiles() {
  return gulp.src('./app/general-files/*')
    .pipe(gulp.dest('./docs/general-files'));
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
    .pipe(gulp.dest('./docs/assets/images'));
};

function useMin() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest('./docs'))
};

// exports.build = gulp.series(
//   icons,
//   deleteDistFolder,
//   copyGeneralFiles,
//   optimizeImages,
//   styles,
//   scripts,
//   useMin
// );

exports.build = gulp.series(
  icons,
  gulp.parallel(
    gulp.series(deleteDistFolder, copyGeneralFiles),
    gulp.series(optimizeImages, styles, scripts)
  ),
  useMin
)