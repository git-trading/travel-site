var gulp = require('gulp'),
watch = require('gulp-watch');

const { series } = require('gulp');

/* the old way
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

function defaultTask(cb) {
  cb();
}

exports.default = defaultTask