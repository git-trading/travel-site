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

const { watch, series, src, dest } = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create();

// function defaultTask(cb) {
//   console.log('you created a gulp task');
//   cb();                           
// };

function html(cb) {
  console.log('reloading...');
  browserSync.reload();
  cb();
}

function styles() {
  return src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer])) // order of plugins is important
    .pipe(dest('./app/temp/styles/'))
    .pipe(browserSync.stream())
}

// watch('./app/index.html', html); // matik nang triggered ito kapag nag-gulp bsata nasa labas
// watch('./app/assets/styles/**/*.css', styles);
// exports.default = series(defaultTask, html);

function watchAll() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './app' // points to where index.html lives
    }
  });
  watch('./app/index.html', html); // matik nang triggered ito kapag nag-gulp
  watch('./app/assets/styles/**/*.css', styles);
}


exports.default = series(html, watchAll);
exports.styles = styles;