const gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create();\

function styles() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer])) // order of plugins is important
    .pipe(gulp.dest('./app/temp/styles/'))
}

exports.styles = styles;

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