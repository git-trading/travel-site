/* the old way
var gulp = require('gulp'),
watch = require('gulp-watch');

gulp.task('default', function(done) {
  // kailangan 'yung done na argument sa v4.0 ng gulp
  console.log('Hooray - you created a Gulp task.');
  done(); // this is the signal of completion for this gulp task
});

gulp.task('html', function(done) {
  console.log('Imagine something useful being done to your HTML here.')
  done();
});

gulp.task('watch', function() {
  
  watch('./app/index.html', function(events, done) {
    gulp.start('html', done)
  });
  
});
*/

const { watch, series, parallel } = require('gulp');

function defaultTask(cb) {
  console.log('you created a gulp task');
  cb();
};

function html(cb) {
  console.log('doing something with the html')
  cb();
}

watch('./app/index.html', html)

exports.build = series(defaultTask, html)