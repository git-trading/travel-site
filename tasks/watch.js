const gulp = require('gulp'),
browserSync = require('browser-sync').create();

function html(cb) {
  console.log('reloading...');
  browserSync.reload();
  cb();
}

function cssInject() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './app' // points to where index.html lives
    }
  });
  gulp.watch('./app/index.html', html); // matik nang triggered ito kapag nag-gulp
  gulp.watch('./app/assets/styles/**/*.css', gulp.series(styles, cssInject));
}

exports.default = gulp.series(html, watch);