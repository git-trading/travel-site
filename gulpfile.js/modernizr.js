const gulp = require('gulp'),
modernizr = require('gulp-modernizr');

// checks browser for svg, png compatibility 
// adds a class="svg" or class="no-svg" tag to <html> accordingly
function modernizrTask() {
  return gulp.src(['./app/assets/styles/**/*.css','./app/assets/scripts/**/*.js'])
    .pipe(modernizr({
      'options' : [
        'setClasses'
      ]
    }))
    .pipe(gulp.dest('./app/temp/scripts'))
}
// why is it only triggered when saving either App.js or Vendor.js on the dest folder?
// because that's the directory being watched for .js file changes

exports.modernizr = modernizrTask;