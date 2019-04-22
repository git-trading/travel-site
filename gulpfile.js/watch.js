const gulp = require('gulp'),
browserSync = require('browser-sync').create();

var styles = require('./styles').styles,
scripts = require('./scripts').scripts,
modernizr = require('./modernizr').modernizr;

function html(cb) {
  console.log('reloading...');
  browserSync.reload();
  cb();
};

// cssInject belongs with the watcher
function cssInject() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
};

function scriptsRefresh(cb) {
  console.log('detected js file change, refreshing...')
  browserSync.reload();
  cb(); // browserSync.reload() should always have a callback or it gets stuck
}

function watch() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './app' // points to where index.html lives
    }
  }); 
  gulp.watch('./app/index.html', html);
  gulp.watch('./app/assets/styles/**/*.css', gulp.series(styles, cssInject));
  gulp.watch(
    './app/assets/scripts/**/*.js',
    gulp.series(modernizr, scripts, scriptsRefresh)
  );
};

exports.watch = watch;